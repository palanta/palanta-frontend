<template>
  <q-btn id="delete-switch"
         :color="color"
         :label="text"
         @click="$emit('toggle')"
  >
  </q-btn>
</template>

<script>
export default {
  name: 'DeleteSwitch',
  props: {
    deleting: Boolean
  },
  computed: {
    text () {
      return this.deleting ? 'DELETE MODE ON' : 'DELETE MODE OFF'
    },
    color () {
      return this.deleting ? 'negative' : 'grey-8'
    }
  }
}
</script>

<style scoped>
  #delete-switch {
    position: fixed;
    top: 60px;
    right: 10px;
  }
</style>
