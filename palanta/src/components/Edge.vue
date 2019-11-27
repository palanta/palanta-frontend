<template>
  <svg
    :width="svgRect.width"
    :height="svgRect.height"
    :style="`position: absolute; left: ${svgRect.x}; top: ${svgRect.y};`"
  >
    <line
      stroke="#6090b0"
      stroke-width="4"
      :x1="relativeStart.x"
      :y1="relativeStart.y"
      :x2="relativeEnd.x"
      :y2="relativeEnd.y"
    />
  </svg>
</template>

<script lang="ts">
export default {
  props: {
    start: Object,
    end: Object,
    color: String,
    bezierOffset: {
      type: Number,
      default: 128
    },
    padding: {
      type: Number,
      default: 256
    }
  },
  computed: {
    svgRect () {
      let x = Math.min(this.start.x, this.end.x) - this.padding
      let y = Math.min(this.start.y, this.end.y) - this.padding
      return {
        x: x,
        y: y,
        width: Math.max(this.start.x, this.end.x) - x + this.padding * 2,
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
