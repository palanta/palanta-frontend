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
    calculate (input) {
      let logarithm = 0
      if (!isNaN(input.number)) {
        logarithm = Math.log(input.number)
      }
      if (!isNaN(input.base)) {
        logarithm /= Math.log(input.base)
      }
      return { logarithm }
    }
  }
}
</script>
