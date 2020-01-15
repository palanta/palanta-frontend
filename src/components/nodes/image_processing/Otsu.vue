<template>
  <div/>
</template>

<script>
import { BackendImage } from '../../../utils/ajax'

export default {
  spec: {
    id: 'std::otsu',
    title: 'Otsu',
    inputs: [
      {
        id: 'image',
        name: 'Image',
        type: 'image'
      }
    ],
    outputs: [
      {
        id: 'threshold',
        name: 'Threshold',
        type: 'number'
      }
    ],
    async calculate (input) {
      if (input.image instanceof BackendImage) {
        return {
          threshold: await input.image.otsu()
        }
      }
    }
  }
}
</script>
