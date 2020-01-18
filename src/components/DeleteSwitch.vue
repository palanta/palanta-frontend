<template>
  <q-fab id="delete-switch"
         :color="color"
         icon="delete_forever"
         active-icon="delete"
         @click="$emit('toggle')"
  >
  </q-fab>
</template>

<script>
export default {
  name: 'DeleteSwitch',
  props: {
    deleting: Boolean
  },
  computed: {
    color () {
      return this.deleting ? 'negative' : 'grey-8'
    }
  }
}
</script>

<style scoped>
  #delete-switch {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>
