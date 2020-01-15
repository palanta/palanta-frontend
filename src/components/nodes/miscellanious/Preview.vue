<template>
  <div class="text-center q-mt-md">
    <!-- TODO: display bools as True/False -->
    <div v-if="type === 'image'">
      <img :src="value.url" />
    </div>
    <div v-if="type === 'other'">
      {{ value }}
    </div>
    <div v-if="type === undefined">
      <i>nothing to preview</i>
    </div>
  </div>
</template>

<script>
import { BackendImage } from '../../../utils/ajax'

export default {
  spec: {
    id: 'std::preview',
    title: 'Preview',
    icon: require('../../../assets/node_icons/node_preview.svg'),
    inputs: [
      {
        id: 'value',
        name: 'Value',
        type: 'any'
      }
    ],
    outputs: [],
    calculate (input, component) {
      component.value = input.value
      if (input.value === undefined) component.type = undefined
      else if (input.value instanceof BackendImage) component.type = 'image'
      else component.type = 'other'
    }
  },
  data: () => ({
    value: null,
    type: undefined
  })
}
</script>
