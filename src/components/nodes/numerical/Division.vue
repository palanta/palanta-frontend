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
        id: 'dividend',
        name: 'Dividend',
        type: 'number'
      },
      {
        id: 'divisor',
        name: 'Divisor',
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
