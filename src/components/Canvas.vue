<template>
  <div style="position: relative">
    <div class="toolbox-container">
      <div
        class="toolbox-node"
        v-for="(nodeType, component) in nodeTypes"
        :key="nodeType.spec.id"
        @click="addNode(component, nodeType.spec)"
      >{{ nodeType.spec.title }}</div>
    </div>

    <p-background>
      <p-edge
        v-if="newEdge"
        ref="newEdge"
        :start="newEdge.start.$refs ? newEdge.start.$refs.connector : newEdge.start"
        :end="newEdge.end.$refs ? newEdge.end.$refs.connector : newEdge.end"
        :color="newEdge.color"
      />
      <p-edge
        v-for="(edge, index) in edges"
        :key="index"
        :start="edge.start.$refs.connector"
        :end="edge.end.$refs.connector"
        :ref="`${edge.start.nodeId}.${edge.end.nodeId}`"
        :color="edge.color"
      />
      <p-node
        v-for="node in nodes" :key="node.id"
        :instance="node"
        :x=300 :y=100
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
import PNode from '../components/Node'
import PEdge from '../components/Edge'

import Number from '../components/nodes/Number'
import Average from '../components/nodes/Average'
import Binarize from '../components/nodes/Binarize'

import { NodeInstance } from '../utils/instances'
import types from '../utils/types'

const nodeTypes = {
  Number,
  Average,
  Binarize
}

export default {
  components: Object.assign({
    PBackground,
    PNode,
    PEdge
  }, nodeTypes),
  data () {
    return {
      nodeTypes,
      nodes: [],
      newEdge: null,
      edges: []
    }
  },
  methods: {
    onConnect (event) {
      if (event.isFinal) {
        if (this.newEdge && event.connector !== this.newEdge.start) {
          const edge = {
            start: this.newEdge.start,
            end: event.instance,
            color: this.newEdge.color
          }
          if (event.isOutput) edge.start = [edge.end, edge.end = edge.start][0]
          this.addEdge(edge)
        }
        this.newEdge = null
        event.instance.connecting = false
      } else {
        this.newEdge = {
          start: event.instance,
          end: {
            x: event.position.x - this.$el.offsetLeft,
            y: event.position.y - this.$el.offsetTop
          },
          color: types.colors[event.instance.spec.type]
        }
        if (!event.isOutput) this.newEdge.start = [this.newEdge.end, this.newEdge.end = this.newEdge.start][0]
        event.instance.connecting = true
        if (this.$refs.newEdge) this.$refs.newEdge.refresh()
      }
    },
    onNodeMove (nodeId) {
      for (let edgeId in this.$refs) {
        if (edgeId.split('.').includes(nodeId)) {
          for (let edge of this.$refs[edgeId]) {
            edge.refresh()
          }
        }
      }
    },
    addNode (component, spec) {
      this.nodes.push(new NodeInstance(component, spec))
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
      if (edge.start.nodeId === edge.end.nodeId) return false

      return true
    },
    addEdge (edge) {
      if (this.isValidEdge(edge)) {
        this.edges.push(edge)
        edge.start.connected += 1
        edge.end.connected += 1
      }
    }
  }
}
</script>
