<template>
  <div :class="this.output ? 'float-right' : 'float-left'" id="container">
    <div id="name" class="non-selectable" v-if="output">{{ spec.name }}</div>
    <div id="stump">
      <div
        id="connector"
        ref="connector"
        class="cursor-pointer"
        :style="style"
        draggable="true"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @drag="onDrag"
        @dragenter="connecting = true"
        @dragleave="connecting = false"
        @dragover.prevent
        @drop="onDrop"
      />
    </div>
    <div id="name" class="non-selectable" v-if="input">{{ spec.name }}</div>
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
    emitDrag (event, isFirst, isFinal) {
      this.$emit('connect', {
        instance: this,
        connector: this.$refs.connector,
        isOutput: this.output,
        isFirst,
        isFinal,
        offset: { x: event.offsetX, y: event.offsetY },
        position: { x: event.x, y: event.y }
      })
    },
    onDragStart (event) {
      event.dataTransfer.dropEffect = 'link'
      event.dataTransfer.setDragImage(document.createElement('div'), 0, 0)
      this.emitDrag(event, true, false)
    },
    onDragEnd (event) {
      this.emitDrag(event, false, true)
    },
    onDrag (event) {
      this.emitDrag(event, false, false)
    },
    onDrop (event) {
      this.emitDrag(event, false, true)
      this.connecting = false
    }
  }
}
</script>
