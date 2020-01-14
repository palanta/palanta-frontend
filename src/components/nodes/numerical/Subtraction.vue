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
    calculate () {
      let difference = 0
      const factors = this.input('number').map(factor => factor.value).filter(factor => !isNaN(factor))
      if (factors.length > 0) {
        difference = factors.shift()
        factors.forEach(minuend => {
          difference -= minuend
        })
      }
      this.output('difference').value = difference
    }
  }
}
</script>
