<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::exclusivedisjunction',
    title: 'Exclusive Disjunction',
    icon: require('../../../assets/node_icons/node_exclusivedisjunction.svg'),
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
