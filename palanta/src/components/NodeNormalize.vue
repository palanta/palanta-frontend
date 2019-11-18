<template>
  <div class="material-card disable-highlight" @click="onCardClicked($props.listKey)" :style="style">
    <div class="material-card-header" @mousedown="onCardDragStart($event, $props.listKey)">
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
import core from '../pages/Index.vue'

export default {
  name: 'NodeNormalize',
  methods: {
    onCardClicked: function (key) {
      core.methods.onCardClicked(key)
    }
  },
  created () {
    this.onCardDragStart = core.methods.onCardDragStart
  },
  props: [
    'listKey',
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
