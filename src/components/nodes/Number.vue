<template>
  <div class="q-px-md q-pt-md">
    <q-input filled v-model="value" type="number" float-label="Number" />
  </div>
</template>

<script>
export default {
  spec: {
    id: 'std::number',
    title: 'Number',
    icon: require('../../assets/node_icons/node_number.svg'),
    inputs: [],
    outputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number'
      }
    ]
  },
  data: () => ({
    value: 0
  })
}
</script>
