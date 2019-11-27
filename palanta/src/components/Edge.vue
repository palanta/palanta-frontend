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
    start: [Object, HTMLElement],
    end: [Object, HTMLElement],
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
  data () {
    return {
      isMounted: false
    }
  },
  mounted () {
    this.isMounted = true
  },
  computed: {
    centerStart () {
      if (!this.isMounted) {
        return { x: 0, y: 0 }
      }
      let x = this.start.x
      let y = this.start.y
      if (this.start instanceof HTMLElement) {
        let rect = this.start.getBoundingClientRect()
        let parentRect = this.$el.parentElement.getBoundingClientRect()
        x = rect.x + rect.width / 2 - parentRect.x
        y = rect.y + rect.height / 2 - parentRect.y
      }
      return { x, y }
    },
    centerEnd () {
      if (!this.isMounted) {
        return { x: 0, y: 0 }
      }
      let x = this.end.x
      let y = this.end.y
      if (this.end instanceof HTMLElement) {
        let rect = this.end.getBoundingClientRect()
        let parentRect = this.$el.parentElement.getBoundingClientRect()
        x = rect.x + rect.width / 2 - parentRect.x
        y = rect.y + rect.height / 2 - parentRect.y
      }
      return { x, y }
    },
    svgRect () {
      let x = Math.min(this.centerStart.x, this.centerEnd.x) - this.padding
      let y = Math.min(this.centerStart.y, this.centerEnd.y) - this.padding
      return {
        x: x,
        y: y,
        width: Math.max(this.centerStart.x, this.centerEnd.x) - x + this.padding * 2,
        height: Math.max(this.centerStart.y, this.centerEnd.y) - y + this.padding * 2
      }
    },
    relativeStart () {
      return {
        x: this.centerStart.x - this.svgRect.x,
        y: this.centerStart.y - this.svgRect.y
      }
    },
    relativeEnd () {
      return {
        x: this.centerEnd.x - this.svgRect.x,
        y: this.centerEnd.y - this.svgRect.y
      }
    }
  }
}
</script>
