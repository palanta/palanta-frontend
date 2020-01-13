<template>
  <svg
    :width="svgRect.width"
    :height="svgRect.height"
    :style="`position: absolute; left: ${svgRect.x}px; top: ${svgRect.y}px;`"
  >
    <defs>
      <linearGradient
        :id="`gradient-${id}`"
        gradientUnits="userSpaceOnUse"
        :x1="relativeStart.x"
        :y1="relativeStart.y"
        :x2="relativeEnd.x"
        :y2="relativeEnd.y"
      >
        <stop offset="50%"  :stop-color="startColor" />
        <stop offset="90%" :stop-color="endColor" />
      </linearGradient>
    </defs>
    <path
      fill="none"
      :stroke="`url(#gradient-${id})`"
      stroke-width="4"
      stroke-linecap="round"
      :d="`
        M ${relativeStart.x} ${relativeStart.y}
        C ${relativeStart.x + bezierOffset} ${relativeStart.y}
          ${relativeEnd.x - bezierOffset} ${relativeEnd.y}
          ${relativeEnd.x} ${relativeEnd.y}
        `"
    />
  </svg>
</template>

<script lang="ts">
import uuid from '../utils/uuid'

export default {
  props: {
    start: [Object, HTMLElement],
    end: [Object, HTMLElement]
  },
  data () {
    return {
      id: uuid(),
      isMounted: false,
      centerStart: { x: 0, y: 0 },
      centerEnd: { x: 0, y: 0 }
    }
  },
  mounted () {
    this.isMounted = true
    this.refresh()
  },
  computed: {
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
    },
    bezierOffset () {
      return 0.5 * Math.sqrt((this.centerEnd.x - this.centerStart.x) ** 2 + (this.centerEnd.y - this.centerStart.y) ** 2)
    },
    padding () {
      return this.bezierOffset
    },
    startColor () {
      return this.start.style.borderColor
    },
    endColor () {
      return this.end.style ? this.end.style.borderColor : this.startColor
    }
  },
  methods: {
    getCenterStart () {
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
    getCenterEnd () {
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
    refresh () {
      this.centerStart = this.getCenterStart()
      this.centerEnd = this.getCenterEnd()
    }
  }
}
</script>
