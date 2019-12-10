<template>
  <div class="q-px-md q-pt-md">
    <q-input
      filled
      autogrow
      v-model="text"
      type="textarea"
      placeholder="Enter text here"
    />
  </div>
</template>

<script>
export default {
  spec: {
    id: 'std::text',
    title: 'Text',
    icon: require('../../assets/node_icons/node_text.svg'),
    inputs: [],
    outputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'text'
      }
    ]
  },
  data: () => ({
    text: ''
  })
}
</script>
