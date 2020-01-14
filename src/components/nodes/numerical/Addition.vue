<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::addition',
    title: 'Addition',
    icon: require('../../../assets/node_icons/node_addition.svg'),
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
        name: 'Sum',
        type: 'number'
      }
    ]
  }
}
</script>
