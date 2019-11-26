<template>
  <q-card id="node" class="shadow-1" :style="style">
    <q-card-section class="header text-center" v-touch-pan.mouse="onPan">
      {{ spec.title }}
    </q-card-section>
    <slot />
    <div class="doc-container column reverse">
      <div v-for="i in slotRows" :key="i" class="row">
        <div class="col-6 no-wrap">
          <p-connector input v-if="i <= spec.inputs.length" :spec="spec.inputs[spec.inputs.length - i]" />
        </div>
        <div class="col-6">
          <p-connector output v-if="i <= spec.outputs.length" :spec="spec.outputs[spec.outputs.length - i]" @connect="onConnect" />
        </div>
      </div>
    </div>
  </q-card>
</template>

<style lang="scss" scoped>
  #node {
    width: 250px;
    position: absolute;
  }

  .header {
    height: 50px;
    background-color: #303030;
  }
</style>

<script>
import PConnector from './Connector'

export default {
  components: {
    PConnector
  },
  props: {
    spec: Object,
    x: Number,
    y: Number
  },
  data () {
    return {
      isMoving: false,
      left: this.x || 0,
      top: this.y || 100
    }
  },
  computed: {
    style () {
      return `left: ${this.left}px; top: ${this.top}px;`
    },
    slotRows () {
      return Math.max(this.spec.inputs.length, this.spec.outputs.length)
    }
  },
  methods: {
    onPan (event) {
      this.left += event.delta.x
      this.top += event.delta.y
    },
    onConnect (event) {
      this.$emit('connect', event)
    }
  }
}
</script>
