<template>
  <div :class="this.output ? 'float-right' : 'float-left'" id="container">
    <div id="name" v-if="output">{{ name }}</div>
    <div id="connector" :style="`background-color: ${this.color};`" v-touch-pan.mouse="onPan" />
    <div id="name" v-if="input">{{ name }}</div>
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
export default {
  props: {
    name: String,
    color: String,
    input: Boolean,
    output: Boolean
  },
  methods: {
    onPan (event) {
      // console.log(`start: ${event.position.top - event.offset.x}, ${event.position.top - event.offset.x}`)
      // console.log(`offset: ${event.offset.x}, ${event.offset.y}`)
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
