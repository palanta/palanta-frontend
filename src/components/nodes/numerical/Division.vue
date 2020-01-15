<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::division',
    title: 'Division',
    icon: require('../../../assets/node_icons/node_division.svg'),
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
        id: 'quotient',
        name: 'Quotient',
        type: 'number'
      }
    ],
    calculate (input) {
      let quotient = 0
      const factors = input.number.filter(factor => !isNaN(factor))
      if (factors.length > 0) {
        quotient = factors.shift()
        factors.forEach(dividor => {
          quotient /= dividor
        })
      }
      return { quotient }
    }
  }
}
</script>
