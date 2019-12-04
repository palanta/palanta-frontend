<template>
  <div class="q-px-md q-py-md">
    <q-input filled v-model="text" type="textarea" float-label="Textarea" rows="3" placeholder="Enter text here"/>
  </div>
</template>

<script>
export default {
  spec: {
    id: 'std::note',
    title: 'Note',
    inputs: [],
    outputs: []
  }
}
</script>
