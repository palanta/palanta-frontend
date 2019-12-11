<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::division',
    title: 'Division',
    icon: require('../../../assets/node_icons/node_division.svg'),
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
        name: 'Quotient',
        type: 'number'
      }
    ]
  }
}
</script>
