<template>
  <p-node :spec="spec">
    <div class="q-px-md q-pt-md">
      <q-input filled v-model="value" />
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
    spec,
    value: 0
  })
}
</script>
