<template>
  <div>
    <div class="toolbox-container">
      <div class="toolbox-node" @click="addActiveCard('NodeAverage')">
        Average
      </div>
      <div class="toolbox-node" @click="addActiveCard('NodeNormalize')">
        Normalize
      </div>
      <div class="toolbox-node" @click="addActiveCard('NodeNumber')">
        Number
      </div>
    </div>

    <div id="grid-base"
         class="grid-background"
         @mousemove="onCardDrag($event)"
         @mouseup="onCardDragEnd()"
         @mouseleave="onCardDragEnd()">
      <div v-for="(node, index) in nodelist" :key="index">
        <component v-bind:is="node['nodeType']"
                   v-bind:offsetLeft="node['offsetLeft']"
                   v-bind:offsetTop="node['offsetTop']"
                   @mousedown.native="onCardDragStart($event, index)"
                   @click.native="onCardClicked(index)">
        </component>
      </div>
    </div>
  </div>
</template>

<style>
  @import "../css/palanta.css";
</style>

<script>

import NodeNormalize from '../components/NodeNormalize'
import NodeAverage from '../components/NodeAverage'
import NodeNumber from '../components/NodeNumber'

export default {
  name: 'PageIndex',
  components: {
    NodeNormalize,
    NodeAverage,
    NodeNumber
  },
  data () {
    return {
      nodelist: [],
      dragging: {
        originX: 0,
        originY: 0,
        clickX: 0,
        clickY: 0,
        isDragging: false,
        activeCard: null,
        activeKey: null
      }
    }
  },
  methods: {
    onCardClicked: function (key) {
      if (this.deleting) {
        this.removeActiveCard(key)
      }
    },
    onCardDragStart: function (event, key) {
      let card = event.target.closest('.material-card')

      this.dragging.activeCard = card
      this.dragging.activeKey = key
      this.dragging.originX = card.offsetLeft
      this.dragging.originY = card.offsetTop
      this.dragging.clickX = event.clientX
      this.dragging.clickY = event.clientY

      this.dragging.isDragging = true
    },
    onCardDrag: function (event) {
      if (this.dragging.isDragging) {
        let card = this.dragging.activeCard
        let newX = this.dragging.originX + (event.clientX - this.dragging.clickX)
        let newY = this.dragging.originY + (event.clientY - this.dragging.clickY)

        if (event.shiftKey) {
          newX = newX + 25 - ((newX + 25) % 50)
          newY = newY + 25 - ((newY + 25) % 50)
        }

        card.style.left = newX + 'px'
        card.style.top = newY + 'px'

        this.nodelist[this.dragging.activeKey]['offsetLeft'] = newX + 'px'
        this.nodelist[this.dragging.activeKey]['offsetTop'] = newY + 'px'
      }
    },
    onCardDragEnd: function () {
      this.dragging.isDragging = false
    },
    addActiveCard: function (type) {
      this.nodelist.push({ nodeType: type, offsetLeft: '200px', offsetTop: '50px' })
    },
    removeActiveCard: function (index) {
      this.nodelist.splice(index, 1)
    }
  }
}
</script>
