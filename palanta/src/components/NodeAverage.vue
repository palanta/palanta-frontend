<template>
  <div class="material-card disable-highlight" :style="style">
    <div class="material-card-header">
      <img class="material-card-icon" src="../assets/node_icons/node_average.png" alt="">
      Average
    </div>
    <div class="material-card-section-wrapper">
      <div class="connection-point connection-point-input connection-point-number"></div>
      <div class="material-card-connection-section material-card-input-section">
        Value 1
      </div>
    </div>
    <div class="material-card-section-wrapper">
      <div class="connection-point connection-point-input connection-point-number"></div>
      <div class="material-card-connection-section material-card-input-section">
        Value 2
      </div>
    </div>
    <div class="material-card-section-wrapper">
      <div class="connection-point connection-point-input connection-point-number"></div>
      <div class="material-card-connection-section material-card-input-section">
        Value 3
      </div>
    </div>
    <div class="material-card-section-wrapper">
      <div class="connection-point connection-point-output connection-point-number"></div>
      <div class="material-card-connection-section material-card-output-section">
        Average Value
      </div>
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
