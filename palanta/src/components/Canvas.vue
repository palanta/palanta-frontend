
<template>
  <div>
    <div class="toolbox-container">
      <div class="toolbox-node" v-for="(nodeType, component) in nodeTypes" :key="nodeType.spec.id" @click="addNode(component, nodeType.spec)">
        {{ nodeType.spec.title }}
      </div>
    </div>

    <div class="grid-background">

      <svg id="line" width="5000" height="5000" :style="`position: absolute; left: 0; top: 0;`">
        <line
          :x1="connectStart.x" :y1="connectStart.y"
          :x2="connectStart.x + connectOffset.x" :y2="connectStart.y + connectOffset.y"
        />
      </svg>

      <component
        v-for="node in nodes"
        :key="node.id"
        :is="node.component"
      />
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
import Number from '../components/nodes/Number'
import Average from '../components/nodes/Average'
import Binarize from '../components/nodes/Binarize'

const nodeTypes = {
  Number,
  Average,
  Binarize
}

export default {
  components: Object.assign({}, nodeTypes),
  data () {
    return {
      nodeTypes,
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
    addNode: function (component, spec) {
      this.nodes.push({ component, spec })
    }
  }
}
</script>
