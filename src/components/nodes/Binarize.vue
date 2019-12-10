<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::binarize',
    title: 'Binarize',
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
