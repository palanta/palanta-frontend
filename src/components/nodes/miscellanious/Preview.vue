<template>
  <div class="text-center q-mt-md">
    <div v-if="value !== undefined">
      <!-- TODO: display differently for each basic type (e.g. booleans as 'True'/'False', images as <img/>) -->
      <!-- using native js representation string for now -->
      {{ value }}
    </div>
    <div v-if="value === undefined">
      <i>nothing to preview</i>
    </div>
  </div>
</template>

<script>

export default {
  spec: {
    id: 'std::preview',
    title: 'Preview',
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'any'
      }
    ],
    outputs: [],
    calculate (component) {
      component.value = this.input('value').value
    }
  },
  data: () => ({
    value: null
  })
}
</script>
