<template>
  <q-card id="node" class="shadow-1" :style="style">
    <q-card-section class="header non-selectable text-center" v-touch-pan.mouse="onPan">
      <img id="icon" class="non-selectable" v-if="instance.spec.icon" :src="instance.spec.icon" />
      {{ instance.title }}
    </q-card-section>
    <slot />
    <div class="row">
      <div class="col-6 column justify-end">
        <div v-for="input in instance.inputs" :key="input.id">
          <p-connector
            input
            :spec="input"
            :node="_self"
            ref="connectors"
            @connect="onConnect"
            @connected="onConnected"
            @disconnected="onDisconnected"
          />
        </div>
      </div>
      <div class="col-6 column justify-end">
        <div v-for="output in instance.outputs" :key="output.id">
          <p-connector
            output
            :spec="output"
            :node="_self"
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
import { ConnectorInstance } from '../utils/instances'

import PConnector from './Connector'

export default {
  components: {
    PConnector
  },
  props: {
    instance: Object
  },
  data () {
    return {
      edges: [],
      isMoving: false,
      panStart: null
    }
  },
  computed: {
    style () {
      return `left: ${this.instance.position.x}px; top: ${this.instance.position.y}px;`
    },
    slotRows () {
      return Math.max(this.instance.inputs.length, this.instance.outputs.length)
    }
  },
  methods: {
    onPan (event) {
      if (event.isFirst) this.panStart = this.instance.position
      let newX = this.panStart.x + event.offset.x
      let newY = this.panStart.y + event.offset.y
      if (event.evt.ctrlKey) {
        newX = Math.round(newX / 50) * 50
        newY = Math.round(newY / 50) * 50
      }
      this.instance.position = { x: newX, y: newY }
      if (event.isFinal) this.panStart = null
      this.$emit('move', this)
    },
    onConnect (event) {
      this.$emit('connect', event)
    },
    onConnected (edge) {
      this.edges.push(edge)
      if (edge.start.node === this) this.insertVariadic(this.instance.outputs, edge.start.spec)
      if (edge.end.node === this) this.insertVariadic(this.instance.inputs, edge.end.spec)
    },
    onDisconnected (edge) {
      if (this.edges.includes(edge)) this.edges.splice(this.edges.indexOf(edge), 1)
    },
    insertVariadic (channel, afterSpec) {
      if (!afterSpec.variadic) return
      const index = channel.indexOf(afterSpec)
      if (index >= 0) {
        const connected = this.$refs.connectors.filter(connector => channel.indexOf(connector.spec) >= 0 && connector.spec.specId === afterSpec.specId)
        if (connected.length === connected.filter(connector => connector.connected).length) {
          const newSpec = new ConnectorInstance(afterSpec)
          let lastIndex = index
          for (let i = index; i < channel.length; ++i) {
            if (channel[i].specId === newSpec.specId) lastIndex = i
          }
          channel.splice(lastIndex + 1, 0, newSpec)
          channel.counts[newSpec.specId]++
        } else {
          if (afterSpec.variadic.collapse) {
            // Move unconnected connector behind last connected one
            channel.reverse()
            const emptyIndex = channel.findIndex(connector =>
              connector.specId === afterSpec.specId &&
              !this.$refs.connectors.filter(component => component.spec === connector)[0].connected
            )
            const lastIndex = channel.findIndex(connector =>
              connector.specId === afterSpec.specId &&
              this.$refs.connectors.filter(component => component.spec === connector)[0].connected
            )
            if (emptyIndex > lastIndex) {
              // Move empty connector before last connected (because the channel is reversed)
              channel.splice(lastIndex, 0, channel.splice(emptyIndex, 1)[0])
            }
            channel.reverse()
          }
        }
      }
      this.$nextTick(function () {
        this.$emit('move', this)
      })
    },
    removeVariadic (channel, spec) {
      if (!spec.variadic) return
      if (!spec.variadic.collapse) return
      const index = channel.indexOf(spec)
      if (index >= 0) {
        const connected = this.$refs.connectors.filter(connector => connector.connected && connector.spec.specId === spec.specId).length
        if (Math.max(connected + 1, spec.variadic.minimum) < channel.counts[spec.specId]) {
          channel.splice(index, 1)
          channel.counts[spec.specId]--
        }
      }
      this.$nextTick(function () {
        this.$emit('move', this)
      })
    }
  }
}
</script>
