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
        variadic: true
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
