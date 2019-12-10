<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::root',
    title: 'Root',
    icon: require('../../assets/node_icons/node_root.svg'),
    inputs: [
      {
        name: 'Number',
        type: 'number'
      },
      {
        name: 'Degree',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'Root',
        type: 'number'
      }
    ]
  }
}
</script>
