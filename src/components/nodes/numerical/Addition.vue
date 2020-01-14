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
      const summands = this.input('number').map(summand => summand.value).filter(summand => !isNaN(summand))
      summands.forEach(summand => {
        sum += summand
      })
      this.output('sum').value = sum
    }
  }
}
</script>
