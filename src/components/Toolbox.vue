<template>
  <div>
    <div id="toolbox-wrapper" :style="`left: ${toolboxOffset}px;`">
      <div id="toolbox-container" :style="`min-width: ${toolboxWidth}px;`">
        <div class="toolbox-title">Nodes</div>
        <q-expansion-item
          v-for="(category, title) in types"
          :key="title"
          :label="title"
          header-style="background-color: #303030;
                        border-bottom: solid #505050 3px;
                        min-height: 36px;"
        >
          <div class="q-py-xs" style="border-bottom: solid #505050 3px;">
            <div class="node-list-element row justify-start q-mx-sm q-my-none"
                 v-for="(type, component) in category.basic"
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
            <div v-if="Object.keys(category.advanced).length > 0">
              <div class="node-list-element row justify-start q-mx-sm q-my-none">
                <div class="col-1">
                  <div class="tree-line" />
                </div>
                <div class="col q-py-xs">
                  <q-btn dense
                         class="full-width"
                         @click="toggleAdvanced(title)"
                         style="background-color: #303030;
                                border-radius: 0;
                                border: solid #505050 3px;">
                    <img id="icon" class="non-selectable col-auto"
                         src="../assets/advanced.svg" />
                    <div class="col toolbox-text">Advanced Nodes</div>
                  </q-btn>
                </div>
              </div>
              <q-expansion-item dense
                                v-model="advancedNodes[title]"
                                label="Advanced"
                                class="advanced-section"
                                header-style="display: none;">
                <div class="node-list-element row justify-start q-mx-sm q-my-none"
                     v-for="(type, component) in category.advanced"
                     :key="type.spec.id"
                     style="margin-left: 45px;"
                >
                  <div class="col-1">
                    <div class="tree-line" />
                  </div>
                  <div class="col q-py-xs">
                    <q-btn dense
                           color="secondary"
                           class="full-width row"
                           @click="$emit('add', component, type.spec)"
                    >
                      <img id="icon"
                           class="non-selectable col-auto"
                           v-if="type.spec.icon"
                           :src="type.spec.icon" />
                      <div class="col toolbox-text">{{ type.spec.title }}</div>
                    </q-btn>
                  </div>
                </div>
              </q-expansion-item>
            </div>
          </div>
        </q-expansion-item>
      </div>
      <div class="toolbox-toggle">
        <q-btn flat dense icon="menu" @click="toggleToolbox"></q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
#toolbox-wrapper {
  position: fixed;
  display: flex;
  transition: 150ms ease-in-out;
  z-index: 1;
}

#toolbox-container {
  background-color: rgba(0, 0, 0, 0.8);
  border-right: solid #505050 3px;
  box-shadow: black 0 0 10px;
  z-index: 2;
}

.toolbox-title {
  padding: 10px;
  font-size: 18px;
  background-color: #202020;
  text-align: center;
  border-bottom: solid #505050 3px;
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
  z-index: 2;
}
</style>

<script>
export default {
  data () {
    return {
      toolboxWidth: 250,
      toolboxVisible: true,
      advancedNodes: {
        'Values': false,
        'Numerical': false,
        'Image Processing': false,
        'Miscellaneous': false
      }
    }
  },
  props: {
    types: Object
  },
  computed: {
    toolboxOffset: function () {
      return this.toolboxVisible ? '0' : '-' + this.toolboxWidth
    }
  },
  methods: {
    toggleToolbox () {
      this.toolboxVisible = !this.toolboxVisible
    },
    toggleAdvanced (category) {
      this.advancedNodes[category] = !this.advancedNodes[category]
    }
  }
}
</script>
