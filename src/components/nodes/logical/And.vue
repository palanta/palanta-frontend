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
      let result = true
      const booleans = input.boolean.filter(booleans => !isNaN(booleans))
      booleans.forEach(bool => {
        if (!bool) {
          result = false
        }
      })
      return { result }
    }
  }
}
</script>
