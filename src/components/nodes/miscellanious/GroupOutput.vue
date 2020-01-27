<template>
  <div/>
</template>

<script>
import uuid from '../../../utils/uuid'

export default {
  spec: {
    id: 'std::groupoutput',
    title: 'Group Output',
    inputs: [
      {
        id: 'output',
        name: 'Output',
        type: 'any',
        variadic: true
      }
    ],
    outputs: [],
    calculate () {
      this.input('output').forEach(connector => {
        if (connector.edges.length) {
          connector.type = connector.edges[0].start.type
          if (connector.specId === 'output') {
            connector.variadic = false
            connector.specId = uuid()
          }
        }
      })
    }
  }
}
</script>
