<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::multiplication',
    title: 'Multiplication',
    icon: require('../../../assets/node_icons/node_multiplication.svg'),
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
        id: 'product',
        name: 'Product',
        type: 'number'
      }
    ],
    calculate (input) {
      let product = 1
      const factors = input.number.filter(factor => !isNaN(factor))
      factors.forEach(factor => {
        product *= factor
      })
      return { product }
    }
  }
}
</script>
