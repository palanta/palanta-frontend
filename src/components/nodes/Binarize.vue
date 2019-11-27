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
