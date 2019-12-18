<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::or',
    title: 'Or',
    icon: require('../../../assets/node_icons/node_disjunction.svg'),
    inputs: [
      {
        id: 'boolean',
        name: 'Boolean',
        type: 'boolean',
        variadic: true
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
