<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::division',
    title: 'Division',
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
        name: 'Quotient',
        type: 'number'
      }
    ]
  }
}
</script>
