<template>
  <div class="material-card disable-highlight" @click="onCardClicked($props.listKey)" :style="style">
    <div class="material-card-header" @mousedown="onCardDragStart($event, $props.listKey)">
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
