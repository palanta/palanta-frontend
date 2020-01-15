<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::addition',
    title: 'Addition',
    icon: require('../../../assets/node_icons/node_addition.svg'),
    inputs: [
      {
        id: 'number',
        name: 'Number',
        type: 'number',
        variadic: {
          minimum: 2
        }
      }
    ],
    outputs: [
      {
        id: 'sum',
        name: 'Sum',
        type: 'number'
      }
    ],
    calculate (input) {
      let sum = 0
      const summands = input.number.filter(summand => !isNaN(summand))
      summands.forEach(summand => {
        sum += summand
      })
      return { sum }
    }
  }
}
</script>
