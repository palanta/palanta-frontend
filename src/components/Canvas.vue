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
      <p-edge v-if="newEdge" :start="newEdge.start" :end="newEdge.end" />
      <p-edge
        v-for="(edge, index) in edges"
        :key="index"
        :start="edge.start"
        :end="edge.end"
        color="0x6090b0"
      />
      <p-node v-for="node in nodes" :key="node.id" :instance="node" @connect="onConnect">
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
      this.newEdge = {
        start: event.connector,
        end: {
          x: event.position.left - this.$el.offsetLeft,
          y: event.position.top - this.$el.offsetTop
        }
      }
    },
    addNode: function (component, spec) {
      this.nodes.push(new NodeInstance(component, spec))
    }
  }
}
</script>
