<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::imply',
    title: 'Imply',
    icon: require('../../../assets/node_icons/node_implication.svg'),
    inputs: [
      {
        id: 'boolean1',
        name: 'Boolean',
        type: 'boolean'
      },
      {
        id: 'boolean2',
        name: 'Boolean',
        type: 'boolean'
      }
    ],
    outputs: [
      {
        id: 'result',
        name: 'Result',
        type: 'boolean'
      }
    ],
    calculate (input) {
      let result = true
      if (!isNaN(input.boolean1) && !isNaN(input.boolean2)) {
        if (input.boolean1 && !input.boolean2) {
          result = false
        }
      }
      return { result }
    }
  }
}
</script>
