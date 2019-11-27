<template>
  <div id="background" class="grid-background">
    <slot/>
  </div>
</template>

<style scoped>
  #background {
    background-color: #262626;
    background-size: 50px 50px;
    background-image: linear-gradient(to right, transparent 49px, #2d2d2d 1px),
    linear-gradient(to bottom, transparent 49px, #2d2d2d 1px);
    width: 5000px;
    height: 5000px;
    transform-origin: top left;
  }
</style>
