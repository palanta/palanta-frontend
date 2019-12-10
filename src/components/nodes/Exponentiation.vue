<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::exponentiation',
    title: 'Exponentiation',
    icon: require('../../assets/node_icons/node_exponentiation.svg'),
    inputs: [
      {
        name: 'Number',
        type: 'number'
      },
      {
        name: 'Exponent',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'Power',
        type: 'number'
      }
    ]
  }
}
</script>
