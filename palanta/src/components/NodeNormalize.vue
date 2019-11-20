<template>
  <div class="material-card disable-highlight" :style="style">
    <div class="material-card-header">
      <img class="material-card-icon" src="../assets/node_icons/node_normalize.png" alt="">
      Normalize
    </div>
    <div class="material-card-section-wrapper">
      <div class="connection-point connection-point-input connection-point-number"></div>
      <div class="material-card-connection-section material-card-input-section">
        Input Number
      </div>
    </div>
    <div class="material-card-section-wrapper">
      <div class="connection-point connection-point-input connection-point-number"></div>
      <input class="material-card-input-field" placeholder="Min-Value">
    </div>
    <div class="material-card-section-wrapper">
      <div class="connection-point connection-point-input connection-point-number"></div>
      <input class="material-card-input-field" placeholder="Max-Value">
    </div>
    <div class="material-card-section-wrapper">
      <div class="connection-point connection-point-output connection-point-number"></div>
      <div class="material-card-connection-section material-card-output-section">
        Normalized Output
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
