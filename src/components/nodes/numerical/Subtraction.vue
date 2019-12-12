<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::subtraction',
    title: 'Subtraction',
    icon: require('../../../assets/node_icons/node_subtraction.svg'),
    inputs: [
      {
        id: 'minuend',
        name: 'Minuend',
        type: 'number'
      },
      {
        id: 'subtrahend',
        name: 'Subtrahend',
        type: 'number',
        variadic: true
      }
    ],
    outputs: [
      {
        name: 'Difference',
        type: 'number'
      }
    ]
  }
}
</script>
