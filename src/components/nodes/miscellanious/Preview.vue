<template>
  <div>
    {{ value }}
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
    outputs: []
  },
  data: () => ({
    value: null
  })
}
</script>
