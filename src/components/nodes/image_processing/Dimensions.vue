<template>
  <div/>
</template>

<script>
import { BackendImage } from '../../../utils/ajax'

export default {
  spec: {
    id: 'std::dims',
    title: 'Dimensions',
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
        id: 'width',
        name: 'Width',
        type: 'number'
      },
      {
        id: 'height',
        name: 'Height',
        type: 'number'
      },
      {
        id: 'channels',
        name: 'Channels',
        type: 'number'
      }
    ],
    async calculate (input) {
      if (input.image instanceof BackendImage) {
        const info = await input.image.info()
        return {
          width: info.shape[1],
          height: info.shape[0],
          channels: info.shape[2]
        }
      }
    }
  }
}
</script>
