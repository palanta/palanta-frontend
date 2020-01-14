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
    calculate () {
      let product = 1
      const factors = this.input('number').filter(factor => !isNaN(factor.value))
      factors.forEach(factor => {
        product *= factor.value
      })
      this.output('product').value = product
    }
  }
}
</script>
