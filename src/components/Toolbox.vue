<template>
  <div>
    <div id="toolbox-container">
      <q-expansion-item
        v-for="(category, title) in types"
        :key="title"
        :label="title"
        header-style="background-color: #303030; border-bottom: solid #505050 3px"
      >
        <div class="q-py-sm">
          <div class="node-list-element row justify-start q-mx-sm q-my-none"
                v-for="(type, component) in category"
                :key="type.spec.id"
          >
            <div class="col-1">
              <div class="tree-line" />
            </div>
            <div class="col q-py-sm">
              <q-btn
                color="primary"
                class="full-width row toolbox-button"
                @click="$emit('add', component, type.spec)"
              >
                <img id="icon" class="non-selectable col-auto" v-if="type.spec.icon" :src="type.spec.icon" />
                <div class="col toolbox-text">{{ type.spec.title }}</div>
              </q-btn>
            </div>
          </div>
        </div>
      </q-expansion-item>
    </div>
  </div>
</template>

<style scoped>
#toolbox-container {
  width: 200px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom-right-radius: 10px;
  border-right: solid #505050 3px;
  border-bottom: solid #505050 3px;
  z-index: 1;
}

.tree-line {
  position: relative;
  top: -50%;
  width: 100%;
  height: 100%;
  border-left: solid #505050 4px;
  border-bottom: solid #505050 2px;
  box-shadow: 0px 2px 0 0 #505050;
  z-index: -1;
}

.toolbox-button {
  padding: 4px;
}

.toolbox-text {
  margin-left: 4px;
  text-align: left;
}
</style>

<script>
export default {
  props: {
    types: Object
  }
}
</script>
