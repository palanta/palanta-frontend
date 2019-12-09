<template>
  <q-card id="node" class="shadow-1" :style="style">
    <q-card-section class="header non-selectable text-center" v-touch-pan.mouse="onPan">
      <img id="icon" class="non-selectable" v-if="instance.spec.icon" :src="instance.spec.icon" />
      {{ instance.title }}
    </q-card-section>
    <slot />
    <div class="row">
      <div class="col-6 column reverse">
        <div v-for="input in instance.inputs" :key="input.id">
          <p-connector
            input
            :spec="input"
            :node="instance"
            ref="connectors"
            @connect="onConnect"
            @connected="onConnected"
            @disconnected="onDisconnected"
          />
        </div>
      </div>
      <div class="col-6 column reverse">
        <div v-for="output in instance.outputs" :key="output.id">
          <p-connector
            output
            :spec="output"
            :node="instance"
            ref="connectors"
            @connect="onConnect"
            @connected="onConnected"
            @disconnected="onDisconnected"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<style scoped>
#node {
  position: absolute;
  width: 250px;
  border-radius: 0.85em;
  background-color: #38383b;
  box-shadow: #101010 0 0 10px;
}
.header {
  height: 50px;
  background-color: #282828;
}
#icon {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 10px;
  top: 10px;
}
</style>

<script>
import PConnector from './Connector'

export default {
  components: {
    PConnector
  },
  props: {
    instance: Object,
    x: Number,
    y: Number
  },
  data () {
    return {
      edges: [],
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
      return Math.max(this.instance.inputs.length, this.instance.outputs.length)
    }
  },
  methods: {
    onPan (event) {
      this.left += event.delta.x
      this.top += event.delta.y
      this.$emit('move', this)
    },
    onConnect (event) {
      this.$emit('connect', event)
    },
    onConnected (edge) {
      this.edges.push(edge)
    },
    onDisconnected (edge) {
      if (this.edges.includes(edge)) this.edges.splice(this.edges.indexOf(edge), 1)
    }
  }
}
</script>
