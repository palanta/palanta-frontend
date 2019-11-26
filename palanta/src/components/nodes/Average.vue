<template>
  <p-node :spec="spec" />
</template>

<script>
import PNode from '../Node'

const spec = {
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

export default {
  spec,
  components: {
    PNode
  },
  data: () => ({
    spec
  })
}
</script>
