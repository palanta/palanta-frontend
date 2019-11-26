<template>
  <div :class="this.output ? 'float-right' : 'float-left'" id="container">
    <div id="name" v-if="output">{{ spec.name }}</div>
    <div id="stump" v-touch-pan.mouse="onPan">
      <div id="connector" :style="style" />
    </div>
    <div id="name" v-if="input">{{ spec.name }}</div>
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
    input: Boolean,
    output: Boolean,
    connected: Boolean
  },
  computed: {
    color () {
      return types.colors[this.spec.type]
    },
    style () {
      return `border-color: ${this.color}; background-color: ${this.connected ? this.color : '#38383b'};`
    }
  },
  methods: {
    onPan (event) {
      this.$emit('connect', {
        connector: this,
        isFirst: event.isFirst,
        isFinal: event.isFinal,
        offset: event.offset
      })
    }
  }
}
</script>
