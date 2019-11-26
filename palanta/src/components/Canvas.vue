
<template>
  <div>
    <div class="toolbox-container">
      <div class="toolbox-node" v-for="spec in specs" :key="spec.id" @click="addNode(spec)">
        {{ spec.title }}
      </div>
    </div>

    <div class="grid-background">

      <svg id="line" width="5000" height="5000" :style="`position: absolute; left: 0; top: 0;`">
        <line
          :x1="connectStart.x" :y1="connectStart.y"
          :x2="connectStart.x + connectOffset.x" :y2="connectStart.y + connectOffset.y"
        />
      </svg>

      <p-node
        v-for="(node, index) in nodes" :key="index"
        :spec="node"
        :x=400
        :y=300
        @connect="onConnect"
      >
        lel
      </p-node>
    </div>
  </div>
</template>

<style>
  @import "../css/palanta.css";
  line {
    stroke: #ff00ff;
    stroke-width: 4;
  }
</style>

<script>

import PNode from '../components/Node'

export default {
  components: {
    PNode
  },
  data () {
    return {
      specs: [
        require('../nodes/binarize')
      ],
      nodes: [],
      connectStart: { x: 0, y: 0 },
      connectOffset: { x: 0, y: 0 }
    }
  },
  methods: {
    onConnect (event) {
      this.connectStart = {
        x: event.connector.$el.offsetLeft,
        y: event.connector.$el.offsetTop
      }
      this.connectOffset = event.offset
      console.log(event)
    },
    addNode: function (spec) {
      this.nodes.push(spec)
    }
  }
}
</script>
