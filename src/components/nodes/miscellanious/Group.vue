<template>
  <div class="q-ma-md text-center">
    <q-btn color="primary" style="width: 100%" @click="open = true">edit</q-btn>
    <q-dialog full-width full-height v-model="open" ref="dialog" @show="$nextTick(() => $refs.canvas.refreshEdges())" @hide="refreshConnectors" transition-show="fade" transition-hide="fade">
      <p-canvas :embedded="instance.title" :nodes="instance.groupNodes" :edges="instance.groupEdges" ref="canvas" @close="open = false" />
    </q-dialog>
  </div>
</template>

<script>
import { ConnectorInstance } from '../../../utils/instances'
import Engine from '../../../utils/engine'

export default {
  spec: {
    id: 'std::group',
    title: 'Group',
    inputs: [],
    outputs: [],
    data: () => ({
      groupNodes: [],
      groupEdges: [],
      getGroupInputs () {
        let inputs = []
        this.groupNodes.filter(node => node.spec.id === 'std::groupinput').forEach(node => {
          inputs = inputs.concat(node.outputs)
        })
        return inputs
      },
      getGroupOutputs () {
        let outputs = []
        this.groupNodes.filter(node => node.spec.id === 'std::groupoutput').forEach(node => {
          outputs = outputs.concat(node.inputs)
        })
        return outputs
      },
      getVersions () {
        return this.groupNodes.filter(node => node.spec.id === 'std::groupoutput').map(node => node.version).join('')
      },
      currentVersions: ''
    }),
    async calculate (input) {
      const engine = new Engine()
      this.groupNodes.filter(node => node.spec.id === 'std::groupinput').forEach(node => {
        // redirect inputs
        node.outputs.forEach(output => {
          if (output.specId !== 'input') output.value = input[output.specId]
        })
        // queue group input
        engine.queueComputation(node, undefined, undefined, true)
      })
      // settle engine
      await engine.compute()
      this.currentVersions = this.getVersions()
      // gather outputs
      const result = {}
      this.groupNodes.filter(node => node.spec.id === 'std::groupoutput').forEach(node => {
        node.inputs.forEach(input => {
          if (input.specId !== 'output') result[input.specId] = input.value
        })
      })
      return result
    }
  },
  components: {
    PCanvas: () => import('../../Canvas')
  },
  props: { instance: Object },
  data: () => ({
    open: false
  }),
  methods: {
    refreshConnectors () {
      // inputs
      const inputs = this.instance.getGroupInputs()
      // find corpses
      this.instance.inputs.forEach((connector, index) => {
        if (inputs.findIndex(input => connector.id === input.id) === -1) {
          this.instance.inputs.splice(index, 1)
        }
      })
      // add new connectors
      inputs.forEach(input => {
        if (this.instance.inputs.findIndex(connector => connector.id === input.id) === -1) {
          if (!input.new) {
            const newInput = new ConnectorInstance(input, this.instance)
            newInput.id = input.id
            newInput.variadic = false
            this.instance.inputs.push(newInput)
          }
        }
      })
      // outputs
      const outputs = this.instance.getGroupOutputs()
      // find corpses
      this.instance.outputs.forEach((connector, index) => {
        if (outputs.findIndex(output => connector.id === output.id) === -1) {
          this.instance.outputs.splice(index, 1)
        }
      })
      // add new connectors
      outputs.forEach(output => {
        if (this.instance.outputs.findIndex(connector => connector.id === output.id) === -1) {
          if (!output.new) {
            const newOutput = new ConnectorInstance(output, this.instance)
            newOutput.id = output.id
            newOutput.variadic = false
            this.instance.outputs.push(newOutput)
          }
        }
      })
      // recompute on new version
      if (this.instance.getVersions() !== this.instance.currentVersions) { this.$emit('change', this) }
    }
  }
}
</script>
