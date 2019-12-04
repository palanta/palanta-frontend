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
    icon: require('../../assets/node_icons/node_number.png'),
    inputs: [],
    outputs: [
      {
        id: 'output',
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
