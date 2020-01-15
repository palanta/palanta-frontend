<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::and',
    title: 'And',
    icon: require('../../../assets/node_icons/node_conjunction.svg'),
    inputs: [
      {
        id: 'boolean',
        name: 'Boolean',
        type: 'boolean',
        variadic: {
          minimum: 2
        }
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
      const booleans = input.boolean.filter(booleans => !isNaN(booleans))
      for (let bool of booleans) {
        if (!bool) return { result: false }
      }
      return { result: true }
    }
  }
}
</script>
