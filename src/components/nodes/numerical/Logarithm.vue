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
        name: 'Number',
        type: 'number'
      },
      {
        name: 'Base',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'Logarithm',
        type: 'number'
      }
    ]
  }
}
</script>
