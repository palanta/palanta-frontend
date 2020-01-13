<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::and',
    title: 'And',
    icon: require('../../../assets/node_icons/node_conjunction.svg'),
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
