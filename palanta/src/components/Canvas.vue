<template>
  <div>
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
      edges: []
    }
  },
  methods: {
    onConnect (event) {
      let rect = event.connector.getBoundingClientRect()
      let parentRect = this.$el.parentElement.getBoundingClientRect()
      this.edges.push({
        start: {
          x: rect.x + rect.width / 2 - parentRect.x,
          y: rect.y + rect.height / 2 - parentRect.y
        },
        end: {
          x: 100,
          y: 100
        }
      })
    },
    addNode: function (component, spec) {
      this.nodes.push(new NodeInstance(component, spec))
    }
  }
}
</script>
