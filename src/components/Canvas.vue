<template>
  <div style="position: relative">
    <p-toolbox :types="nodeTypes" @add="addNode" />
    <p-background>
      <p-edge
        v-if="newEdge"
        ref="newEdge"
        :start="newEdge.start.$refs ? newEdge.start.$refs.connector : newEdge.start"
        :end="newEdge.end.$refs ? newEdge.end.$refs.connector : newEdge.end"
        :color="newEdge.color"
      />
      <p-edge
        v-for="edge in edges"
        :ref="edge.id"
        :key="edge.id"
        :start="edge.start.$refs.connector"
        :end="edge.end.$refs.connector"
        :color="edge.color"
      />
      <p-node
        v-for="node in nodes"
        :key="node.id"
        :instance="node"
        :x="300"
        :y="100"
        ref="nodes"
        @connect="onConnect"
        @move="onNodeMove"
      >
        <component :is="node.component" />
      </p-node>
    </p-background>
  </div>
</template>

<style>
@import "../css/palanta.css";
</style>

<script>
import PBackground from '../components/Background'
import PToolbox from '../components/Toolbox'
import PNode from '../components/Node'
import PEdge from '../components/Edge'

import Number from '../components/nodes/Number'
import Boolean from '../components/nodes/Boolean'
import String from '../components/nodes/String'
import File from '../components/nodes/File'
import Average from '../components/nodes/Average'
import Binarize from '../components/nodes/Binarize'
import Note from '../components/nodes/Note'
import Addition from '../components/nodes/Addition'
import Subtraction from '../components/nodes/Subtraction'
import Multiplication from '../components/nodes/Multiplication'
import Division from '../components/nodes/Division'
import Exponentiation from '../components/nodes/Exponentiation'
import Root from '../components/nodes/Root'
import Logarithm from '../components/nodes/Logarithm'

import { NodeInstance, EdgeInstance } from '../utils/instances'
import types from '../utils/types'

const nodeTypes = {
  'Values': {
    Number,
    Boolean,
    String,
    File
  },
  'Numerical': {
    Average,
    Binarize,
    Addition,
    Subtraction,
    Multiplication,
    Division,
    Exponentiation,
    Root,
    Logarithm
  },
  'Other': {
    Note
  }
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
      newEdgeForwards: null
    }
  },
  methods: {
    addNode (component, spec) {
      this.nodes.push(new NodeInstance(component, spec))
    },
    addEdge (edge) {
      if (this.isValidEdge(edge)) {
        this.edges.push(edge)
        edge.start.addEdge(edge)
        edge.end.addEdge(edge)
        return true
      } else {
        console.error('Edge rejected') // TODO: make clearer to user
        return false
      }
    },
    removeEdge (edge) {
      edge.start.removeEdge(edge)
      edge.end.removeEdge(edge)
      if (this.edges.includes(edge)) this.edges.splice(this.edges.indexOf(edge), 1)
    },
    isValidEdge (edge) {
      // Connect output to input
      if (!edge.start.output) return false
      if (!edge.end.input) return false
      // Type checking
      // TODO: more elaborate typechecking (bundles, casting)
      if (edge.start.spec.type !== edge.end.spec.type) return false
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
          this.addEdge(this.newEdge)
          this.newEdge = null
        }
      } else {
        let to = {
          x: event.position.x - this.$el.offsetLeft,
          y: event.position.y - this.$el.offsetTop
        }
        if (nearbyConnector) to = nearbyConnector
        if (!this.newEdge) {
          if (event.instance.input && event.instance.connected) {
            const edge = event.instance.edges[0] // TODO: check (/enforce) if exists and only one
            this.removeEdge(edge)
            this.newEdge = edge
            this.newEdge.start.connecting = true
            this.newEdgeForwards = true
          } else {
            const from = event.instance
            const color = types.colors[event.instance.spec.type]
            this.newEdge = event.isOutput ? new EdgeInstance(from, to, color) : new EdgeInstance(to, from, color)
            event.instance.connecting = true
            this.newEdgeForwards = event.isOutput
          }
        } else {
          if (this.newEdgeForwards) this.newEdge.end = to
          else this.newEdge.start = to
          if (this.$refs.newEdge) this.$refs.newEdge.refresh()
        }
      }
    },
    onNodeMove (node) {
      node.edges.forEach(edge => this.$refs[edge.id].forEach(component => component.refresh()))
      if (this.$refs.newEdge) this.$refs.newEdge.refresh()
    }
  }
}
</script>
