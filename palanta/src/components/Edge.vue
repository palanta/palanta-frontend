<template>
  <svg
    :width="svgRect.width"
    :height="svgRect.height"
    :style="`position: absolute; left: ${svgRect.x}; top: ${svgRect.y};`"
  >
    <line :x1="relativeStart.x" :y1="relativeStart.y" :x2="relativeEnd.x" :y2="relativeEnd.y" />
  </svg>
</template>

<style>
@import "../css/palanta.css";
line {
  stroke: #ff00ff;
  stroke-width: 4;
}
</style>

<script lang="ts">
export default {
  props: {
    start: Object,
    end: Object,
    bezierOffset: Number,
    padding: Number
  },
  propData: {
    bezierOffset: 128,
    padding: 256
  },
  computed: {
    // startCenter () {
    //   let rect = this.start.getBoundingClientRect()
    //   let parentRect = this.$el.parent.getBoundingClientRect()
    //   return {
    //     x: rect.x + rect.width / 2 - parentRect.x,
    //     y: rect.y + rect.height / 2 - parentRect.y
    //   }
    // },
    // endCenter () {
    //   let rect = this.end.getBoundingClientRect()
    //   let parentRect = this.$el.parent.getBoundingClientRect()
    //   return {
    //     x: rect.x + rect.width / 2 - parentRect.x,
    //     y: rect.y + rect.height / 2 - parentRect.y
    //   }
    // },
    svgRect () {
      let x = Math.min(this.start.x, this.end.x) - this.padding
      let y = Math.min(this.start.y, this.end.y) - this.padding
      return {
        x: x,
        y: y,
        width: Math.max(this.start.y, this.end.y) - x + this.padding * 2,
        height: Math.max(this.start.y, this.end.y) - y + this.padding * 2
      }
    },
    relativeStart () {
      return {
        x: this.start.x - this.svgRect.x,
        y: this.start.y - this.svgRect.y
      }
    },
    relativeEnd () {
      return {
        x: this.end.x - this.svgRect.x,
        y: this.end.y - this.svgRect.y
      }
    }
  }
}
</script>
