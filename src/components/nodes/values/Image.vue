<template>
  <div >
    <img v-if="image" :src="image.url" width="100%" />
    <div class="q-px-md q-pt-md">
      <q-input
        @input="onInput"
        borderless
        type="file"
        accept="image/*"
      />
    </div>
  </div>
</template>

<script>
import { BackendImage } from '../../../utils/ajax'

export default {
  spec: {
    id: 'std::image',
    title: 'Image',
    icon: require('../../../assets/node_icons/node_image.svg'),
    inputs: [],
    outputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'image'
      }
    ],
    async calculate (input, component) {
      return { value: await component.upload() }
    }
  },
  data () {
    return {
      file: null,
      image: null
    }
  },
  methods: {
    onInput (file) {
      this.file = file[0]
      this.$emit('change', this)
    },
    async upload () {
      this.image = await BackendImage.upload(this.file)
      return this.image
    }
  }
}
</script>
