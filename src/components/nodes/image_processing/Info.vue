<template>
  <div/>
</template>

<script>
import { BackendImage } from '../../../utils/ajax'

export default {
  spec: {
    id: 'std::info',
    title: 'Image Info',
    icon: require('../../../assets/node_icons/node_image.svg'),
    inputs: [
      {
        id: 'image',
        name: 'Image',
        type: 'image'
      }
    ],
    outputs: [
      {
        id: 'mean',
        name: 'Mean',
        type: 'number'
      },
      {
        id: 'median',
        name: 'Median',
        type: 'number'
      },
      {
        id: 'std',
        name: 'Std. Dev.',
        type: 'number'
      }
    ],
    async calculate (input) {
      if (input.image instanceof BackendImage) {
        const { mean, median, std } = await input.image.info()
        return { mean, median, std }
      }
    }
  }
}
</script>
