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
    inputs: [],
    outputs: [
      {
        name: 'Text',
        type: 'text'
      }
    ]
  }
}
</script>
