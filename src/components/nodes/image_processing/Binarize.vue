<template>
  <div/>
</template>

<script>
import { BackendImage } from '../../../utils/ajax'

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
    ],
    async calculate (input) {
      if (input.image instanceof BackendImage && !isNaN(input.threshold)) {
        return {
          image: await BackendImage.binarize(input.image, input.threshold)
        }
      }
    }
  }
}
</script>
