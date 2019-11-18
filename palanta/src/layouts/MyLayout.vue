<template>
  <q-layout id="main-layout" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Palanta
        </q-toolbar-title>
        <q-btn outline
               align="left"
               v-bind:color="deleteButtonColor"
               icon="delete"
               @click="this.toggleDeleteMode"></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import core from '../pages/Index'
import statedata from '../communication/data'

export default {
  name: 'MyLayout',
  data () {
    return {
      deleteButtonColor: 'white'
    }
  },
  created () {
  },
  methods: {
    toggleDeleteMode: function () {
      core.methods.toggleDeleteMode()
      this.deleteButtonColor = statedata.deleting ? 'orange' : 'white'
    }
  }
}
</script>
