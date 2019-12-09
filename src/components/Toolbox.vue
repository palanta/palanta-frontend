<template>
  <div class="toolbox-container">
    <q-expansion-item
      v-for="(category, title) in types"
      :key="title"
      :label="title"
      header-class="node-category-header"
    >
      <div class="node-list-element"
            v-for="(type, component) in category"
            :key="type.spec.id"
      >
        <div class="tree-line"></div>
        <q-btn class="node-list-button"
          color="primary"
          @click="$emit('add', component, type.spec)"
        >{{ type.spec.title }}</q-btn>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  props: {
    types: Array
  }
}
</script>
