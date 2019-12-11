<template>
  <div class="q-px-md q-pt-md">
    <q-input
      @input="val => { file = val[0] }"
      borderless
      type="file"
      accept="image/*"
    />
  </div>
</template>

<script>
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
    ]
  },
  data () {
    return {
      file: null
    }
  }
}
</script>
