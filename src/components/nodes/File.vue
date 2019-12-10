<template>
  <div class="q-px-md q-pt-md">
    <q-input @input="val => { file = val[0] }"
      filled
      type="file"
      accept=".jpg, image/*"
    />
  </div>
</template>

<script>
export default {
  spec: {
    id: 'std::image',
    title: 'Image',
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
