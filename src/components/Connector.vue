<template>
  <div :class="this.output ? 'float-right' : 'float-left'" id="container">
    <div id="name" class="non-selectable" v-if="output"><q-input dense borderless input-class="text-right" v-model="spec.name"/></div>
    <div id="stump" v-touch-pan.mouse.prevent="handlePan">
      <div v-if="spec.bundle" class="cursor-pointer" style="position: relative;"><div id="bundle" /></div>
      <div id="connector" ref="connector" class="cursor-pointer" :style="style" />
    </div>
    <div id="name" class="non-selectable" v-if="input"><q-input dense borderless input-class="text-left" v-model="spec.name"/></div>
  </div>
</template>

<style scoped>
#container {
  height: 50px;
  display: flex;
  align-items: center;
}
#name {
  margin-left: 1.5em;
  margin-right: 1.5em;
}
#stump {
  width: 2em;
  height: 2em;
  margin-left: -1em;
  margin-right: -1em;
  border-radius: 1em;
  border: solid #38383b 0.25em;
  vertical-align: middle;
}
#connector {
  width: 1.5em;
  height: 1.5em;
  border-radius: 0.75em;
  border: solid #00000000 0.25em;
}
#bundle {
  position: absolute;
  top: 0.6em;
  width: 1.5em;
  height: 0.3em;
  background-color: #38383b;
}
</style>

<script>
import types from '../utils/types'

export default {
  props: {
    spec: Object,
    node: Object,
    input: Boolean,
    output: Boolean
  },
  data: () => ({
    connecting: false,
    connected: 0,
    edges: []
  }),
  computed: {
    color () {
      return types.colors[this.spec.type]
    },
    style () {
      return `border-color: ${this.color}; background-color: ${this.connected || this.connecting ? this.color : '#38383b'};`
    }
  },
  methods: {
    addEdge (edge) {
      this.edges.push(edge)
      this.connected++
      this.$emit('connected', edge)
    },
    removeEdge (edge) {
      if (this.edges.includes(edge)) this.edges.splice(this.edges.indexOf(edge), 1)
      this.connected--
      this.$emit('disconnected', edge)
    },
    handlePan (event) {
      this.$emit('connect', {
        component: this,
        connector: this.$refs.connector,
        isOutput: this.output,
        isFirst: event.isFirst,
        isFinal: event.isFinal,
        position: { x: event.position.left, y: event.position.top },
        offset: event.distance
      })
    }
  }
}
</script>
