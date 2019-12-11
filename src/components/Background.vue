<template>
  <div
    id="background"
    class="grid-background"
    :style="{backgroundPosition: `${-scroll.x}px ${-scroll.y}px`}"
  >
    <slot />
  </div>
</template>

<style scoped>
#background {
  background-color: #262626;
  background-size: 50px 50px;
  background-image: linear-gradient(to right, transparent 49px, #2d2d2d 1px),
    linear-gradient(to bottom, transparent 49px, #2d2d2d 1px);
  width: 100%;
  height: 100%;
  transform-origin: top left;
}
</style>

<script>
export default {
  props: {
    scroll: Object
  }
}
</script>
