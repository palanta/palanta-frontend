<template>
  <div>
    <div id="toolbox-container">
      <q-expansion-item
        v-for="(category, title) in types"
        :key="title"
        :label="title"
        header-style="background-color: #303030; border-bottom: solid #505050 3px"
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
  </div>
</template>

<style scoped>
#toolbox-container {
  width: 200px;
  height: 400px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom-right-radius: 10px;
  border-right: solid #505050 3px;
  border-bottom: solid #505050 3px;
  z-index: 1;
}

.node-list-element {
  margin: 0.5em 1em;
  position: relative;
}

.node-list-button {
  margin-left: 1em;
}

.tree-line {
  border-left: solid #505050 3px;
  border-bottom: solid #505050 3px;
  height: 43px;
  width: 1em;
  float: left;
  top: -23px;
  position: absolute;
  z-index: -1;
}
</style>

<script>
export default {
  props: {
    types: Array
  }
}
</script>
