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
    inputs: [],
    outputs: []
  },
  data: () => ({
    text: ''
  })
}
</script>
