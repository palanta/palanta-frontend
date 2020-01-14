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
    calculate () {
      let sum = 0
      const factors = this.input('number').filter(factor => !isNaN(factor.value))
      factors.forEach(summand => {
        sum += summand.value
      })
      this.output('sum').value = sum
    }
  }
}
</script>
