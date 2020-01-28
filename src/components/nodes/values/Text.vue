<template>
  <div class="q-px-md q-pt-md">
    <q-input
      filled
      autogrow
      v-model="instance.text"
      type="textarea"
      placeholder="Enter text here"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  spec: {
    id: 'std::text',
    title: 'Text',
    icon: require('../../../assets/node_icons/node_text.svg'),
    inputs: [],
    outputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'text'
      }
    ],
    data: () => ({
      text: ''
    }),
    calculate (input) {
      return { value: this.text }
    }
  },
  props: { instance: Object },
  methods: {
    onInput () {
      this.$emit('change', this)
    }
  }
}
</script>
