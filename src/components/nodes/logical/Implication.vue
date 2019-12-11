<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::implication',
    title: 'Implication',
    icon: require('../../../assets/node_icons/node_implication.svg'),
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
