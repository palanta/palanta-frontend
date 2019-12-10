<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::subtraction',
    title: 'Subtraction',
    inputs: [
      {
        id: 'number',
        name: 'Number',
        type: 'number',
        variadic: true
      }
    ],
    outputs: [
      {
        name: 'Difference',
        type: 'number'
      }
    ]
  }
}
</script>
