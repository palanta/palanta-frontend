<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::nor',
    title: 'Nor',
    icon: require('../../../assets/node_icons/node_jointdenial.svg'),
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
