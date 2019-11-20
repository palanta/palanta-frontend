<template>
  <div class="material-card disable-highlight" :style="style">
    <div class="material-card-header">
      <img class="material-card-icon" src="../assets/node_icons/node_normalize.png" alt="">
      Number
    </div>
    <div class="material-card-section-wrapper">
      <div class="connection-point connection-point-output connection-point-number"></div>
      <input class="material-card-input-field text-right" placeholder="Output Number">
    </div>
  </div>
</template>

<script>

export default {
  name: 'NodeNormalize',
  props: [
    'offsetLeft',
    'offsetTop'
  ],
  computed: {
    style () {
      return 'left: ' + this.$props.offsetLeft + ';' +
          ' top: ' + this.$props.offsetTop + ';'
    }
  }
}

</script>
