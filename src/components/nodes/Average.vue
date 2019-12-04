<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::average',
    title: 'Average',
    icon: require('../../assets/node_icons/node_average.png'),
    inputs: [
      {
        id: 'number',
        name: 'Number',
        type: 'number',
        variadic: true
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
