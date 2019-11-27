<template>
  <div class="q-px-md q-pt-md">
    <q-input filled v-model="value" />
  </div>
</template>

<script>
export default {
  spec: {
    id: 'std::number',
    title: 'Number',
    inputs: [],
    outputs: [
      {
        name: 'Number',
        type: 'number'
      }
    ]
  },
  data: () => ({
    value: 0
  })
}
</script>
