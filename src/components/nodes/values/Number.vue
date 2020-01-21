<template>
  <div class="q-px-md q-pt-md">
    <q-input filled v-model="instance.value" @input="onInput" type="number" float-label="Number" />
  </div>
</template>

<script>
export default {
  spec: {
    id: 'std::number',
    title: 'Number',
    icon: require('../../../assets/node_icons/node_number.svg'),
    inputs: [],
    outputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'number'
      }
    ],
    data: () => ({
      value: 0
    }),
    calculate (input) {
      return {
        value: parseFloat(this.value)
      }
    }
  },
  props: { instance: Object },
  methods: {
    onInput () {
      this.$emit('change', this)
    }
  }
}
</script>
