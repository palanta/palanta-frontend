<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::average',
    title: 'Average',
    inputs: [
      {
        name: 'Number',
        type: 'number',
        variadic: true
      }
    ],
    outputs: [
      {
        name: 'Average',
        type: 'number'
      }
    ]
  }
}
</script>
