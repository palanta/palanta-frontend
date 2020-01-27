<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::nor',
    title: 'Nor',
    icon: require('../../../assets/node_icons/node_jointdenial.svg'),
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
        if (bool) return { result: false }
      }
      return { result: true }
    }
  }
}
</script>
