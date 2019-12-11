<template>
  <div>
    <div id="toolbox-wrapper" :style="'left:' + toolboxOffset + 'px;'">
      <div id="toolbox-container">
        <q-expansion-item
          v-for="(category, title) in types"
          :key="title"
          :label="title"
          header-style="background-color: #303030;
                        border-bottom: solid #505050 3px;
                        min-height: 36px;"
        >
          <div class="q-py-xs">
            <div class="node-list-element row justify-start q-mx-sm q-my-none"
                  v-for="(type, component) in category"
                  :key="type.spec.id"
            >
              <div class="col-1">
                <div class="tree-line" />
              </div>
              <div class="col q-py-xs">
                <q-btn dense
                  color="primary"
                  class="full-width row"
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
      <div class="toolbox-toggle">
        <q-btn flat dense icon="menu" @click="$emit('toggle')"></q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
#toolbox-wrapper {
  height: 100vh;
  position: fixed;
  display: flex;
  transition: 150ms ease-in-out;
  z-index: 1;
}

#toolbox-container {
  min-width: 200px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  border-right: solid #505050 3px;
  z-index: 2;
}

.tree-line {
  position: relative;
  top: -50%;
  width: 100%;
  height: 100%;
  border-left: solid #505050 4px;
  border-bottom: solid #505050 2px;
  box-shadow: 0 2px 0 0 #505050;
  z-index: -1;
}

.toolbox-text {
  margin-left: 0.285em;
  text-align: left;
}

.toolbox-toggle {
  width: 2.5em;
  height: 2.5em;
  background-color: #202020;
  border-right: solid #505050 3px;
  border-bottom: solid #505050 3px;
  border-bottom-right-radius: 8px;
}
</style>

<script>
export default {
  props: {
    types: Object
  },
  computed: {
    toolboxOffset: function () {
      return this.$parent.$data.toolboxVisible ? '0' : '-200'
    }
  }
}
</script>
