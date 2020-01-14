<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::logarithm',
    title: 'Logarithm',
    icon: require('../../../assets/node_icons/node_logarithm.svg'),
    inputs: [
      {
        id: 'number',
        name: 'Number',
        type: 'number'
      },
      {
        id: 'base',
        name: 'Base',
        type: 'number'
      }
    ],
    outputs: [
      {
        id: 'logarithm',
        name: 'Logarithm',
        type: 'number'
      }
    ],
    calculate () {
      let logarithm = 0
      if (!isNaN(this.input('number').value)) {
        logarithm = Math.log(this.input('number').value)
      }
      if (!isNaN(this.input('base').value)) {
        logarithm /= Math.log(this.input('base').value)
      }
      this.output('logarithm').value = logarithm
    }
  }
}
</script>
