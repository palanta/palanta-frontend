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
    calculate () {
      let average = 0
      const factors = this.input('number').map(factor => factor.value).filter(factor => !isNaN(factor))
      if (factors.length > 0) {
        let sum = 0
        factors.forEach(number => {
          sum += number
        })
        average = sum / factors.length
      }
      this.output('average').value = average
    }
  }
}
</script>
