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
    ]
  }
}
</script>
