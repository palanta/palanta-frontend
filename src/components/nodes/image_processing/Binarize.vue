<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::binarize',
    title: 'Binarize',
    icon: require('../../../assets/node_icons/node_binarize.svg'),
    inputs: [
      {
        id: 'image',
        name: 'Image',
        type: 'image'
      },
      {
        id: 'threshold',
        name: 'Threshold',
        type: 'number'
      }
    ],
    outputs: [
      {
        id: 'image',
        name: 'Image',
        type: 'image'
      }
    ]
  }
}
</script>
