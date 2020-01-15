<template>
  <div id="canvas">
    <p-toolbox id="toolbox" :types="nodeTypes" @add="addNode" />
    <p-background v-touch-pan.mouse.prevent="handlePan" :scroll="scroll">
      <div :style="{ position: 'absolute', top: -scroll.y + 'px', left: -scroll.x + 'px' }">
        <p-edge
          v-if="newEdge"
          ref="newEdge"
          :start="newEdge.start.$refs ? newEdge.start.$refs.connector : newEdge.start"
          :end="newEdge.end.$refs ? newEdge.end.$refs.connector : newEdge.end"
          :bundle="newEdge.bundle"
        />
        <p-edge
          v-for="edge in edges"
          :ref="edge.id"
          :key="edge.id"
          :start="edge.start.$refs.connector"
          :end="edge.end.$refs.connector"
          :bundle="edge.bundle"
        />
        <p-node
          v-for="node in nodes"
          :key="node.id"
          :instance="node"
          ref="nodes"
          @connect="onConnect"
          @move="onNodeMove"
        >
          <component
            :is="node.component"
            :ref="`nodes.${node.id}`"
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
  top: 50px;
}
</style>

<script>
import PBackground from '../components/Background'
import PToolbox from '../components/Toolbox'
import PNode from '../components/Node'
import PEdge from '../components/Edge'

import Values from '../components/nodes/values/values'
import Numerical from '../components/nodes/numerical/numerical'
import ImageProcessing from '../components/nodes/image_processing/image_processing'
import Miscellanious from '../components/nodes/miscellanious/miscellanious'

import uuid from '../utils/uuid'
import { NodeInstance, EdgeInstance } from '../utils/instances'
import types from '../utils/types'

const nodeTypes = {
  'Values': Values,
  'Numerical': Numerical,
  'Image Processing': ImageProcessing,
  'Miscellanious': Miscellanious
}

export default {
  components: Object.assign(
    {
      PBackground,
      PToolbox,
      PNode,
      PEdge
    },
    Object.assign.apply(null, [{}, ...Object.values(nodeTypes)])
  ),
  data () {
    return {
      nodeTypes,
      nodes: [],
      edges: [],
      newEdge: null,
      newEdgeForwards: null,
      scroll: {
        x: 0,
        y: 0
      },
      // processing
      computeQueue: [],
      computing: new Set(),
      computations: {}
    }
  },
  methods: {
    addNode (component, spec) {
      const newNode = new NodeInstance(component, spec, {
        x: window.scrollX + this.scroll.x + 300,
        y: window.scrollY + this.scroll.y + 100
      })
      this.nodes.push(newNode)
      // Initial calculation
      this.$nextTick(() => this.$nextTick(() => {
        const canvasNode = this.$refs.nodes.find(node => node.instance.id === newNode.id)
        if (canvasNode) this.queueComputation(canvasNode)
      }))
    },
    addEdge (edge) {
      if (this.isValidEdge(edge)) {
        this.edges.push(edge)
        edge.start.addEdge(edge)
        edge.end.addEdge(edge)
        edge.transport()
        this.queueComputation(edge.end.node, edge.start.node)
        return true
      } else {
        console.error('Edge rejected') // TODO: make clearer to user
        return false
      }
    },
    removeEdge (edge) {
      edge.start.removeEdge(edge)
      edge.end.removeEdge(edge)
      edge.clear()
      if (this.edges.includes(edge)) this.edges.splice(this.edges.indexOf(edge), 1)
    },
    queueNode (node, dependsOn, notDependsOn) {
      const index = this.computeQueue.findIndex(element => element.node === node)
      let dependencies = dependsOn ? [dependsOn] : []
      if (index >= 0) {
        const previous = this.computeQueue.splice(index, 1)[0]
        dependencies = previous.dependencies.concat(dependencies)
      }
      const deprecatedIndex = dependencies.indexOf(notDependsOn)
      if (deprecatedIndex >= 0) dependencies.splice(deprecatedIndex, 1)
      node.isComputing = true
      return this.computeQueue.push({ dependencies, node }) - 1
    },
    async queueComputation (start, dependsOn, notDependsOn) {
      // Traverse canvas breadth-first to determine update order
      let index = this.queueNode(start, dependsOn, notDependsOn)
      while (index < this.computeQueue.length) {
        const node = this.computeQueue[index].node
        const nextNodes = new Set(node.edges.filter(edge => edge.start.node === node).map(edge => edge.end.node))
        nextNodes.forEach(next => this.queueNode(next, node))
        index++
      }
      this.compute()
    },
    async compute () {
      // A node is considered ready when no dependency is either scheduled or being computed
      const ready = entry => {
        // if (this.computing.has(entry.node)) return false
        for (let dependency of entry.dependencies) {
          if (this.computing.has(dependency)) return false
          if (this.computeQueue.find(entry => entry.node === dependency)) return false
        }
        return true
      }
      // Start all computations that are ready
      const readyEntries = this.computeQueue.filter(ready)
      readyEntries.forEach(entry => this.computeQueue.splice(this.computeQueue.indexOf(entry), 1))
      const promises = readyEntries.map(async entry => {
        this.computing.add(entry.node)

        // Process node
        const [component] = this.$refs[`nodes.${entry.node.instance.id}`]

        const calculationId = uuid()
        this.computations[entry.node.instance.id] = calculationId

        const result = await entry.node.instance.calculate(component)

        const cancelled = calculationId !== this.computations[entry.node.instance.id]

        if (!cancelled) {
          entry.node.instance.applyCalculation(result)
          const outEdges = entry.node.edges.filter(edge => edge.start.node === entry.node)
          outEdges.forEach(edge => edge.transport())

          await this.$nextTick()
          entry.node.$emit('move', entry.node)

          this.computing.delete(entry.node)
          if (this.computeQueue.findIndex(newEntry => newEntry.node === entry.node)) { entry.node.isComputing = false }
        }
      })
      // Repeat as long as queue is not empty
      if (promises.length) {
        await Promise.all(promises)
        return this.compute()
      }
    },
    isValidEdge (edge) {
      // Connect output to input
      if (!edge.start.output) return false
      if (!edge.end.input) return false

      // Type checking
      if (edge.start.spec.bundle !== edge.end.spec.bundle) return false
      if (!types.isCastable(edge.start.spec.type, edge.end.spec.type)) return false

      // Each input may be connected once only
      if (edge.end.connected) return false

      // Prevent connecting a node to itself
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
            let edge = connector.output ? new EdgeInstance(connector, this.newEdge.end) : new EdgeInstance(this.newEdge.start, connector)
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
          if (this.newEdge.start) this.newEdge.start.connecting = false
          if (this.newEdge.end) this.newEdge.end.connecting = false

          // Recalculate node where edge has been detached from
          if (
            this.newEdge.end.node !== event.component.node &&
            this.newEdge.start && this.newEdge.start.node !== event.component.node
          ) this.queueComputation(event.component.node, undefined, this.newEdge.start.node)

          this.addEdge(this.newEdge)
          if (this.newEdge.start.node && event.component.node !== this.newEdge.start.node) {
            this.newEdge.start.node.removeVariadic('output', this.newEdge.start.spec)
            event.component.node.removeVariadic('input', event.component.spec)
          }
        }
        this.newEdge = null
      } else {
        let to = {
          x: event.position.x - this.$el.offsetLeft + window.scrollX + this.scroll.x,
          y: event.position.y - this.$el.offsetTop + window.scrollY + this.scroll.y
        }
        if (nearbyConnector) to = nearbyConnector
        if (!this.newEdge) {
          if (event.component.input && event.component.connected) {
            const edge = event.component.edges[0] // TODO: check (/enforce) if exists and only one
            this.removeEdge(edge)
            this.newEdge = edge
            this.newEdge.start.connecting = true
            this.newEdgeForwards = true
          } else {
            const from = event.component
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
      this.queueComputation(node.$parent.$parent)
    },
    onNodeMove (node) {
      node.edges.forEach(edge => this.$refs[edge.id].forEach(component => component.refresh()))
      if (this.$refs.newEdge) this.$refs.newEdge.refresh()
    },
    handlePan (event) {
      this.scroll.x -= event.delta.x
      this.scroll.y -= event.delta.y
    }
  }
}
</script>
