<template>
  <div :class="this.output ? 'float-right' : 'float-left'" id="container">
    <div id="name" v-if="output">{{ spec.name }}</div>
    <div id="connector" :style="style" v-touch-pan.mouse="onPan" />
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
  #connector {
    width: 2em;
    height: 2em;
    margin-left: -1em;
    margin-right: -1em;
    border-radius: 1em;
    border: solid #202020 4px;
  }
</style>

<script>
import types from '../utils/types'

export default {
  props: {
    spec: Object,
    input: Boolean,
    output: Boolean
  },
  computed: {
    style () {
      return `background-color: ${!this.spec.variadic && types.colors[this.spec.type]};`
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
