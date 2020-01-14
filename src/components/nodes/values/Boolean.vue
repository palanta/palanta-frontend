<template>
  <div class="q-px-md q-pt-md">
    <q-toggle
      :label="toggle ? 'True' : 'False'"
      v-model="toggle"
      checked-icon="check"
      color="green"
      unchecked-icon="clear"
      :true-value="true"
      :false-value="false"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  spec: {
    id: 'std::boolean',
    title: 'Boolean',
    icon: require('../../../assets/node_icons/node_boolean.svg'),
    inputs: [],
    outputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'boolean'
      }
    ],
    calculate (input, component) {
      return { value: component.toggle }
    }
  },
  data () {
    return {
      toggle: true
    }
  },
  methods: {
    onInput () {
      this.$emit('change', this)
    }
  }
}
</script>
