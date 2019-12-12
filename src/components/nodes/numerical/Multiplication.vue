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
        name: 'Product',
        type: 'number'
      }
    ]
  }
}
</script>
