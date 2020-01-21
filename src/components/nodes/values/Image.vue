<template>
  <div >
    <img v-if="instance.image" :src="instance.image.url" width="100%" />
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
    data: () => ({
      file: null,
      image: null
    }),
    async calculate (input) {
      this.image = await BackendImage.upload(this.file)
      return { value: this.image }
    }
  },
  props: { instance: Object },
  methods: {
    onInput (file) {
      this.instance.file = file[0]
      this.$emit('change', this)
    }
  }
}
</script>
