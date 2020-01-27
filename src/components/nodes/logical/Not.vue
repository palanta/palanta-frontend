<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::not',
    title: 'Not',
    icon: require('../../../assets/node_icons/node_negation.svg'),
    inputs: [
      {
        id: 'boolean',
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
      if (!isNaN(input.boolean)) {
        if (!input.boolean) return { result: true }
      }
      return { result: false }
    }
  }
}
</script>
