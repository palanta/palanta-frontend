<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::negation',
    title: 'Negation',
    icon: require('../../../assets/node_icons/node_negation.svg'),
    inputs: [
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
