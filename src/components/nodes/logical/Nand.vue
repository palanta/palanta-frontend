<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::nand',
    title: 'Nand',
    icon: require('../../../assets/node_icons/node_alternativedenial.svg'),
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
