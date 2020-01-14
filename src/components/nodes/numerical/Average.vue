<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::average',
    title: 'Average',
    icon: require('../../../assets/node_icons/node_average.svg'),
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
        id: 'average',
        name: 'Average',
        type: 'number'
      }
    ],
    calculate (input) {
      let average = 0
      const factors = input.number.filter(factor => !isNaN(factor))
      if (factors.length > 0) {
        let sum = 0
        factors.forEach(number => {
          sum += number
        })
        average = sum / factors.length
      }
      return { average }
    }
  }
}
</script>
