<template>
  <div/>
</template>

<script>
import uuid from '../../../utils/uuid'

export default {
  spec: {
    id: 'std::groupinput',
    title: 'Group Input',
    inputs: [],
    outputs: [
      {
        id: 'input',
        name: 'Input',
        type: 'any',
        variadic: true
      }
    ],
    calculate () {
      this.output('input').forEach(connector => {
        if (connector.edges.length) {
          connector.type = connector.edges[0].end.type
          if (connector.specId === 'input') {
            connector.variadic = false
            connector.specId = uuid()
          }
        }
      })
      // Preserve output values
      const result = {}
      this.outputs.forEach(output => {
        result[output.specId] = output.value
      })
      return result
    }
  }
}
</script>
