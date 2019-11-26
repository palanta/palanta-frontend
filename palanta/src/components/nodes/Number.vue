<template>
  <p-node :spec="spec">
    <div class="q-px-md q-pt-md">
      <q-input filled/>
    </div>
  </p-node>
</template>

<script>
import PNode from '../Node'

const spec = {
  id: 'std::number',
  title: 'Number',
  inputs: [],
  outputs: [
    {
      name: 'Number',
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
