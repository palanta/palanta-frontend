<template>
  <div/>
</template>

<script>
import { BackendImage } from '../../../utils/ajax'

export default {
  spec: {
    id: 'std::greyscale',
    title: 'Greyscale',
    inputs: [
      {
        id: 'image',
        name: 'Image',
        type: 'image'
      }
    ],
    outputs: [
      {
        id: 'image',
        name: 'Image',
        type: 'image'
      }
    ],
    async calculate (input) {
      if (input.image instanceof BackendImage) {
        return {
          image: await input.image.greyscaled()
        }
      }
    }
  }
}
</script>
