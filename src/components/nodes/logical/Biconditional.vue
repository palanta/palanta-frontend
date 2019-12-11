<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::biconditional',
    title: 'Biconditional',
    icon: require('../../../assets/node_icons/node_biconditional.svg'),
    inputs: [
      {
        id: 'boolean',
        name: 'Boolean',
        type: 'boolean'
      },
      {
        id: 'boolean',
        name: 'Boolean',
        type: 'boolean'
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
