<template>
  <div class="q-px-md q-py-md">
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
    id: 'std::note',
    title: 'Note',
    icon: require('../../../assets/node_icons/node_note.svg'),
    inputs: [],
    outputs: []
  },
  data: () => ({
    text: ''
  })
}
</script>
