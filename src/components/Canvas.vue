<template>
  <div style="position: relative">
    <p-toolbox :types="nodeTypes" @add="addNode" />
    <p-background>
      <p-edge v-if="newEdge" :start="newEdge.start" :end="newEdge.end" :color="newEdge.color" />
      <p-edge
        v-for="(edge, index) in edges"
        :key="index"
        :start="edge.start"
        :end="edge.end"
        color="0x6090b0"
      />
      <p-node v-for="node in nodes" :key="node.id" :instance="node" :x=300 :y=100 @connect="onConnect">
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
import Average from '../components/nodes/Average'
import Binarize from '../components/nodes/Binarize'
import Note from '../components/nodes/Note'

import { NodeInstance } from '../utils/instances'
import types from '../utils/types'

const nodeTypes = {
  'Values': {
    Number
  },
  'Numerical': {
    Average,
    Binarize
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
    Object.assign.apply(null, Object.values(nodeTypes))
  ),
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
        },
        color: types.colors[event.instance.spec.type]
      }
      if (!event.isOutput) this.newEdge.start = [this.newEdge.end, this.newEdge.end = this.newEdge.start][0]
      if (event.isFinal) {
        this.newEdge = null
        event.instance.connecting = false
      } else event.instance.connecting = true
    },
    addNode: function (component, spec) {
      this.nodes.push(new NodeInstance(component, spec))
    }
  }
}
</script>
