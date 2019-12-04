<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::average',
    title: 'Average',
    icon: require('../../assets/node_icons/node_average.svg'),
    inputs: [
      {
        name: 'Number',
        type: 'number',
        variadic: true
      }
    ],
    outputs: [
      {
        name: 'Average',
        type: 'number'
      }
    ]
  }
}
</script>
