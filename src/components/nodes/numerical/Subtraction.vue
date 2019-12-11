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
        id: 'number',
        name: 'Number',
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
