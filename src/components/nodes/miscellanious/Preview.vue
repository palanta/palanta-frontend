<template>
  <div class="text-center">
    <!-- TODO: display bools as True/False -->
    <div v-if="instance.type === 'image'">
      <img :src="instance.value.url" width="100%" class="cursor-pointer" @click="lightbox = true"/>
      <q-dialog v-model="lightbox" full-width full-height>
        <img :src="instance.value.url" :style="{ 'max-width': '100%', 'max-height': '100%' }" />
      </q-dialog>
    </div>
    <div v-if="instance.type === 'other'" class="q-mt-md">
      {{ instance.value }}
    </div>
    <div v-if="instance.type === undefined" class="q-mt-md">
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
    data: () => ({
      value: null,
      type: undefined
    }),
    calculate (input) {
      this.value = input.value
      if (input.value === undefined) this.type = undefined
      else if (input.value instanceof BackendImage) this.type = 'image'
      else this.type = 'other'
    }
  },
  props: { instance: Object },
  data: () => ({
    lightbox: false
  })
}
</script>
