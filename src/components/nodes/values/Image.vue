<template>
  <div class="q-px-md q-pt-md">
    <q-input
      @input="onInput"
      borderless
      type="file"
      accept="image/*"
    />
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
      file: null
    }
  },
  methods: {
    onInput (file) {
      this.file = file[0]
      this.$emit('change', this)
    },
    async upload () {
      return BackendImage.upload(this.file)
    }
  }
}
</script>
