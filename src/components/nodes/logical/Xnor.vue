<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::xnor',
    title: 'Xnor',
    icon: require('../../../assets/node_icons/node_biconditional.svg'),
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
