<template>
  <div class="q-px-md q-pt-md">
    <q-toggle
      :label="toggle"
      v-model="toggle"
      checked-icon="check"
      color="green"
      unchecked-icon="clear"
      true-value=true
      false-value=false
    />
  </div>
</template>

<script>
export default {
  spec: {
    id: 'std::boolean',
    title: 'Boolean',
    icon: require('../../assets/node_icons/node_boolean.svg'),
    inputs: [],
    outputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'boolean'
      }
    ]
  },
  data () {
    return {
      toggle: 'true'
    }
  }
}
</script>
