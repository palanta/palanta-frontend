<template>
  <div id="canvas">
    <p-infobox id="infobox"
               @infobox-toggle="toggleInfobox"
               :style="`transition: 200ms; margin-top: ${infoboxOffset}px`" />
    <p-delete-switch :deleting="deleteMode" @toggle="deleteMode = !deleteMode" />
    <p-toolbox id="toolbox" :types="nodeTypes" @add="addNode" />
    <p-background v-touch-pan.mouse.prevent="handlePan" :scroll="scroll">
      <div :style="{ position: 'absolute', top: -scroll.y + 'px', left: -scroll.x + 'px' }">
        <div v-if="isMounted">
          <p-edge
            v-if="newEdge"
            ref="newEdge"
            :instance="newEdge"
            :start="newEdge.start.id ? getConnector(newEdge.start.id).$refs.connector : newEdge.start"
            :end="newEdge.end.id ? getConnector(newEdge.end.id).$refs.connector : newEdge.end"
          />
          <p-edge
            v-for="edge in edges"
            :ref="edge.id"
            :key="edge.id"
            :instance="edge"
            :start="getConnector(edge.start.id).$refs.connector"
            :end="getConnector(edge.end.id).$refs.connector"
          />
        </div>
        <p-node
          v-for="node in nodes"
          :key="node.id"
          :instance="node"
          :class="nodeClasses"
          ref="nodes"
          @delete="removeNode"
          @connect="onConnect"
          @move="onNodeMove"
          @variadicInsert="onVariadicInsert"
          @variadicRemove="onVariadicRemove"
        >
          <component
            :is="node.component"
            :ref="`nodes.${node.id}`"
            :instance="node"
            @change="onNodeChange"
          />
        </p-node>
      </div>
    </p-background>
  </div>
</template>

<style>
@import "../css/palanta.css";
#canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#toolbox {
  position: absolute;
}
</style>

<script>
import PBackground from '../components/Background'
import PDeleteSwitch from '../components/DeleteSwitch'
import PInfobox from './Infobox'
import PToolbox from '../components/Toolbox'
import PNode from '../components/Node'
import PEdge from '../components/Edge'

import Values from '../components/nodes/values/values'
import Numerical from '../components/nodes/numerical/numerical'
import ImageProcessing from '../components/nodes/image_processing/image_processing'
import Miscellanious from '../components/nodes/miscellanious/miscellanious'

import { NodeInstance, EdgeInstance } from '../utils/instances'
import types from '../utils/types'
import Engine from '../utils/engine'

const nodeTypes = {
  'Values': Values,
  'Numerical': Numerical,
  'Image Processing': ImageProcessing,
  'Miscellanious': Miscellanious
}

const nodeTypesFlat = {
  'VB': nodeTypes.Values.basic,
  'VA': nodeTypes.Values.advanced,
  'NB': nodeTypes.Numerical.basic,
  'NA': nodeTypes.Numerical.advanced,
  'IB': nodeTypes['Image Processing'].basic,
  'IA': nodeTypes['Image Processing'].advanced,
  'MB': nodeTypes.Miscellanious.basic,
  'MA': nodeTypes.Miscellanious.advanced
}

export default {
  components: Object.assign(
    {
      PBackground,
      PDeleteSwitch,
      PInfobox,
      PToolbox,
      PNode,
      PEdge
    },
    Object.assign.apply(null, [{}, ...Object.values(nodeTypesFlat)])
  ),
  props: {
    nodes: { type: Array, default: () => [] },
    edges: { type: Array, default: () => [] }
  },
  data () {
    return {
      isMounted: false,
      nodeTypes,
      connectors: {},
      newEdge: null,
      newEdgeForwards: null,
      deleteMode: false,
      infoboxVisible: true,
      scroll: {
        x: 0,
        y: 0
      },
      engine: new Engine(
        async node => {
          const [component] = this.$refs[`nodes.${node.id}`]
          if (component) {
            await this.$nextTick()
            component.$parent.$parent.$emit('move', component.$parent.$parent)
          }
        }
      )
    }
  },
  mounted () {
    this.isMounted = true
  },
  methods: {
    addNode (component, spec) {
      const newNode = new NodeInstance(component, spec, {
        x: window.scrollX + this.scroll.x + 300,
        y: window.scrollY + this.scroll.y + 100
      })
      this.nodes.push(newNode)
      this.$nextTick(() => this.$nextTick(() => {
        const canvasNode = this.$refs.nodes.find(node => node.instance.id === newNode.id)
        // Register connectors
        if (canvasNode.$refs.connectors) {
          canvasNode.$refs.connectors.forEach(connector => {
            this.connectors[connector.spec.id] = connector
          })
        }
        // Initial calculation
        if (canvasNode) this.engine.queueComputation(newNode)
      }))
    },
    getConnector (id) {
      // Find in cache
      const cached = this.connectors[id]
      if (cached) return cached
      // Register all connectors
      this.$refs.nodes.forEach(node => {
        if (node.$refs.connectors) {
          node.$refs.connectors.forEach(connector => {
            this.connectors[connector.spec.id] = connector
          })
        }
      })
      return this.connectors[id]
    },
    removeNode (node) {
      if (this.deleteMode) {
        let edgesCopy = Array.from(node.instance.edges)
        edgesCopy.forEach(edge => this.removeEdge(edge, true))
        if (this.nodes.includes(node.instance)) this.nodes.splice(this.nodes.indexOf(node.instance), 1)
        node.$refs.connectors.forEach(connector => {
          delete this.connectors[connector.spec.id]
        })
      }
    },
    addEdge (edge) {
      if (this.isValidEdge(edge)) {
        this.edges.push(edge)
        this.getConnector(edge.start.id).addEdge(edge)
        this.getConnector(edge.end.id).addEdge(edge)
        edge.transport()
        if (edge.start.variadic) this.engine.queueComputation(edge.start.node, undefined, undefined, true)
        this.engine.queueComputation(edge.end.node, edge.start.node)
        return true
      } else {
        console.error('Edge rejected') // TODO: make clearer to user
        return false
      }
    },
    removeEdge (edge, recalculate) {
      this.getConnector(edge.start.id).removeEdge(edge)
      this.getConnector(edge.end.id).removeEdge(edge)
      edge.clear()
      if (this.edges.includes(edge)) this.edges.splice(this.edges.indexOf(edge), 1)
      if (recalculate) this.engine.queueComputation(edge.end.node)
    },
    refreshEdges () {
      this.edges.forEach(edge => {
        this.$refs[edge.id].forEach(component => component.refresh())
      })
    },
    isValidEdge (edge) {
      const start = this.getConnector(edge.start.id)
      const end = this.getConnector(edge.end.id)

      // Edges are between connectors
      if (!start || !end) return false

      // Connect output to input
      if (!start.output) return false
      if (!end.input) return false

      // Type checking
      if (edge.start.bundle !== edge.end.bundle) return false
      if (!types.isCastable(edge.start.type, edge.end.type)) return false

      // Each input may be connected once only
      if (edge.end.connected) return false

      // TODO: Prevent connecting a node to itself
      if (edge.start.node === edge.end.node) return false

      return true
    },
    onConnect (event) {
      let nearbyConnector = null
      if (this.newEdge) {
        let closest = null
        let closestDist = null
        for (let node of this.$refs.nodes) {
          // Ignore nodes that have no connectors.
          if (!node.$refs.connectors) continue
          for (let connector of node.$refs.connectors) {
            let edge = connector.output ? new EdgeInstance(connector.spec, this.newEdge.end) : new EdgeInstance(this.newEdge.start, connector.spec)
            // Only snap if the potential edge is valid.
            if (!this.isValidEdge(edge)) continue
            let cr = connector.$refs.connector.getBoundingClientRect()
            let xDist = (cr.x + cr.width / 2.0) - event.position.x
            let yDist = (cr.y + cr.height / 2.0) - event.position.y
            let dist = Math.sqrt(xDist * xDist + yDist * yDist)
            if (!closestDist || dist < closestDist) {
              closest = connector
              closestDist = dist
            }
          }
        }
        // TODO: make this configurable
        if (closestDist < 48.0) {
          nearbyConnector = closest
        }
      }
      if (event.isFinal) {
        if (this.newEdge) {
          if (this.newEdge.start.id) this.getConnector(this.newEdge.start.id).connecting = false
          if (this.newEdge.end.id) this.getConnector(this.newEdge.end.id).connecting = false

          // Recalculate node where edge has been detached from
          if (
            this.newEdge.end.node !== event.component.node.instance &&
            this.newEdge.start && this.newEdge.start.node !== event.component.node.instance
          ) this.engine.queueComputation(event.component.node.instance, undefined, this.newEdge.start.node)

          this.addEdge(this.newEdge)
          if (this.newEdge.start.node && event.component.node.instance !== this.newEdge.start.node) {
            this.$refs[`nodes.${this.newEdge.start.node.id}`][0].$parent.$parent.removeVariadic('output', this.newEdge.start)
            event.component.node.removeVariadic('input', event.component.spec)
          }
        }
        this.newEdge = null
      } else {
        let to = {
          x: event.position.x - this.$el.offsetLeft + window.scrollX + this.scroll.x,
          y: event.position.y - this.$el.offsetTop + window.scrollY + this.scroll.y
        }
        if (nearbyConnector) to = nearbyConnector.spec
        if (!this.newEdge) {
          if (event.component.input && event.component.spec.connected) {
            const edge = event.component.spec.edges[0] // TODO: check (/enforce) if exists and only one
            this.removeEdge(edge)
            this.newEdge = edge
            this.getConnector(this.newEdge.start.id).connecting = true
            this.newEdgeForwards = true
          } else {
            const from = event.component.spec
            const bundle = event.component.spec.bundle
            this.newEdge = event.isOutput ? new EdgeInstance(from, to, bundle) : new EdgeInstance(to, from, bundle)
            event.component.connecting = true
            this.newEdgeForwards = event.isOutput
          }
        } else {
          if (this.newEdgeForwards) this.newEdge.end = to
          else this.newEdge.start = to
          if (this.$refs.newEdge) this.$refs.newEdge.refresh()
        }
      }
    },
    onNodeChange (node) {
      this.engine.queueComputation(node.$parent.$parent.instance)
    },
    onNodeMove (node) {
      node.instance.edges.forEach(edge => this.$refs[edge.id].forEach(component => component.refresh()))
      if (this.$refs.newEdge) this.$refs.newEdge.refresh()
    },
    onVariadicInsert (connector) {
      this.connectors[connector.spec.id] = connector
    },
    onVariadicRemove (id) {
      delete this.connectors[id]
    },
    handlePan (event) {
      this.scroll.x -= event.delta.x
      this.scroll.y -= event.delta.y
    },
    toggleInfobox () {
      this.infoboxVisible = !this.infoboxVisible
    }
  },
  computed: {
    infoboxOffset () {
      return this.infoboxVisible ? 0
        : -document.getElementById('description').getBoundingClientRect().height
    },
    nodeClasses () {
      return this.deleteMode ? 'delete-border' : ''
    }
  }
}
</script>
