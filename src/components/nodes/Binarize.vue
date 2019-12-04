<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::binarize',
    title: 'Binarize',
    icon: require('../../assets/node_icons/node_binarize.svg'),
    inputs: [
      {
        name: 'Image',
        type: 'image'
      },
      {
        name: 'Threshold',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'Image',
        type: 'image'
      }
    ]
  }
}
</script>
