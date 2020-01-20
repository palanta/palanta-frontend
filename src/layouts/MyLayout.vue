<template>
  <q-layout id="main-layout" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img src="../assets/palanta_logo_Manuscript1.svg" height="100%"/>
        </q-avatar>
        <q-toolbar-title>
          Palanta
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout'
}
</script>
