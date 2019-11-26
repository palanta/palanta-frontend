<template>
  <p-node :spec="spec" />
</template>

<script>
import PNode from '../Node'

const spec = {
  id: 'std::binarize',
  title: 'Binarize',
  inputs: [
    {
      name: 'Image',
      type: 'image'
    },
    {
      name: 'Threshold',
      type: 'number'
    }
  ],
  outputs: [
    {
      name: 'Image',
      type: 'image'
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
