<template>
  <div >
    <img v-if="image" :src="image.url" width="100%" class="cursor-pointer" @click="lightbox = true" @load="$parent.$parent.$emit('move', $parent.$parent)" />
    <q-dialog v-if="image" v-model="lightbox" full-width full-height>
      <img v-if="image" :src="image.url" :style="{ 'max-width': '100%', 'max-height': '100%' }" />
    </q-dialog>
    <div class="q-pt-md image-input-style text-center">
      <b>Drop image or click to select</b>
      <q-input
        class="image-input-core"
        @input="onInput"
        type="file"
        accept="image/*"
      />
    </div>
  </div>
</template>

<style scoped>
.image-input-style {
  margin: 10px;
  border: dashed #A0A0A0 3px;
  color: #A0A0A0;
}

.image-input-core {
  opacity: 0;
  margin-top: calc(-1em - 25px);
  margin-top: -moz-calc(-1em - 25px);
  margin-top: -webkit-calc(-1em - 25px);
}

</style>

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
      image: null,
      lightbox: false
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
