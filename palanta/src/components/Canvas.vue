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

    <div class="grid-background">
      <p-edge v-for="(edge, index) in edges" :key="index" :start="edge.start" :end="edge.end" />
      <p-node
        v-for="(node, index) in nodes"
        :key="index"
        :spec="node.spec"
      >
        <component :is="node.component" />
      </p-node>
    </div>
  </div>
</template>

<script>
import PNode from '../components/Node'
import PEdge from '../components/Edge'
import Number from '../components/nodes/Number'
import Average from '../components/nodes/Average'
import Binarize from '../components/nodes/Binarize'

const nodeTypes = {
  Number,
  Average,
  Binarize
}

export default {
  components: Object.assign({
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
      let rect = event.getBoundingClientRect()
      let parentRect = this.$el.parent.getBoundingClientRect()
      this.edges.push({
        start: {
          x: rect.x - parentRect.x,
          y: rect.y - parentRect.y
        },
        end: {
          x: 100,
          y: 100
        }
      })
    },
    addNode: function (component, spec) {
      this.nodes.push({ component, spec })
    }
  }
}
</script>
