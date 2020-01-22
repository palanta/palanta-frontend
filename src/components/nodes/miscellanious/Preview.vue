<template>
  <div class="text-center">
    <!-- TODO: display bools as True/False -->
    <div v-if="type === 'image'">
      <img :src="value.url" width="100%" class="cursor-pointer" @click="lightbox = true" @load="$parent.$parent.$emit('move', $parent.$parent)"/>
      <q-dialog v-model="lightbox" full-width full-height>
        <img :src="value.url" :style="{ 'max-width': '100%', 'max-height': '100%' }" />
      </q-dialog>
    </div>
    <div v-if="type === 'other'" class="q-mt-md">
      {{ value }}
    </div>
    <div v-if="type === undefined" class="q-mt-md">
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
    type: undefined,
    lightbox: false
  })
}
</script>
