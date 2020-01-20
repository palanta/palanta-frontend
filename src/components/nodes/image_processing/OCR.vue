<template>
  <div/>
</template>

<script>
import { BackendImage } from '../../../utils/ajax'

export default {
  spec: {
    id: 'std::ocr',
    title: 'OCR',
    inputs: [
      {
        id: 'image',
        name: 'Image',
        type: 'image'
      }
    ],
    outputs: [
      {
        id: 'text',
        name: 'Text',
        type: 'text'
      }
    ],
    async calculate (input) {
      if (input.image instanceof BackendImage) {
        return {
          text: await input.image.ocr()
        }
      }
    }
  }
}
</script>
