<template>
  <svg
    :width="svgRect.width"
    :height="svgRect.height"
    :style="`position: absolute; left: ${svgRect.x}; top: ${svgRect.y};`"
  >
    <path
      fill="none"
      stroke="red"
      stroke-width="4"
      :d="`M${relativeStart.x},${relativeStart.y}
           C${relativeStart.x + bezierOffset},${relativeStart.y} ${relativeEnd.x - bezierOffset},${relativeEnd.y}
           ${relativeEnd.x},${relativeEnd.y}`"
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
      default: 250
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
