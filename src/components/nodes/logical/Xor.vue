<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::xor',
    title: 'Xor',
    icon: require('../../../assets/node_icons/node_exclusivedisjunction.svg'),
    inputs: [
      {
        id: 'boolean',
        name: 'Boolean',
        type: 'boolean',
        variadic: {
          minimum: 2
        }
      }
    ],
    outputs: [
      {
        id: 'boolean',
        name: 'Boolean',
        type: 'boolean'
      }
    ]
  }
}
</script>
