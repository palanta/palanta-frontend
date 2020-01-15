<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::subtraction',
    title: 'Subtraction',
    icon: require('../../../assets/node_icons/node_subtraction.svg'),
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
        id: 'difference',
        name: 'Difference',
        type: 'number'
      }
    ],
    calculate (input) {
      let difference = 0
      const factors = input.number.filter(factor => !isNaN(factor))
      if (factors.length > 0) {
        difference = factors.shift()
        factors.forEach(minuend => {
          difference -= minuend
        })
      }
      return { difference }
    }
  }
}
</script>
