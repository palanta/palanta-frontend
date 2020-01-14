<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::exponentiation',
    title: 'Exponentiation',
    icon: require('../../../assets/node_icons/node_exponentiation.svg'),
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
        id: 'power',
        name: 'Power',
        type: 'number'
      }
    ],
    calculate () {
      let power = 1
      const factors = this.input('number').map(factor => factor.value).filter(factor => !isNaN(factor))
      if (factors.length > 1) {
        power = factors.shift()
        factors.forEach(exponent => {
          power **= exponent
        })
      }
      this.output('power').value = power
    }
  }
}
</script>
