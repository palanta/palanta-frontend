<template>
  <div class="q-px-md q-pt-md">
    <q-input filled v-model="text" type="textarea" float-label="Textarea" :max-height="5" rows="3" placeholder="enter Text here"/>
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
