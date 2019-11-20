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
                   @click="onCardClicked(index)">
        </component>
      </div>

      <svg width="250" height="150" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 25 h100 Q 125 25 125 50 v50 Q 125 125 150 125 h100"
              stroke="#2061d0" stroke-width="4" fill="transparent"/>
      </svg>
      <svg width="200" height="300" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 25 h50 Q 175 25 175 50 v50 Q 175 125 150 125 h-100 Q 25 125 25 150 v50 Q 25 225 50 225 h50"
              stroke="#2061d0" stroke-width="4" fill="transparent"></path>
      </svg>
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

import statedata from '../communication/data'

export default {
  name: 'PageIndex',
  components: {
    NodeNormalize,
    NodeAverage,
    NodeNumber
  },
  data () {
    return {
      nodelist: statedata.nodelist
    }
  },
  methods: {
    onCardClicked: function (key) {
      if (statedata.deleting) {
        this.removeActiveCard(key)
      }
    },
    onCardDragStart: function (event, key) {
      let card = event.target.parentElement

      statedata.dragging.activeCard = card
      statedata.dragging.activeKey = key
      statedata.dragging.originX = card.offsetLeft
      statedata.dragging.originY = card.offsetTop
      statedata.dragging.clickX = event.clientX
      statedata.dragging.clickY = event.clientY

      statedata.dragging.isDragging = true

      console.log(statedata.dragging.activeKey)
    },
    onCardDrag: function (event) {
      if (statedata.dragging.isDragging) {
        let card = statedata.dragging.activeCard
        let newX = statedata.dragging.originX + (event.clientX - statedata.dragging.clickX) + 25
        let newY = statedata.dragging.originY + (event.clientY - statedata.dragging.clickY) + 25

        let gridX = (newX - (newX % 50) + 'px')
        let gridY = (newY - (newY % 50) + 'px')

        card.style.left = gridX
        card.style.top = gridY

        this.nodelist[statedata.dragging.activeKey]['offsetLeft'] = gridX
        this.nodelist[statedata.dragging.activeKey]['offsetTop'] = gridY
      }
    },
    onCardDragEnd: function () {
      statedata.dragging.isDragging = false
    },
    addActiveCard: function (type) {
      statedata.nodelist.push({ nodeType: type, offsetLeft: '200px', offsetTop: '50px' })
    },
    removeActiveCard: function (index) {
      statedata.nodelist.splice(index, 1)
    },
    toggleDeleteMode: function () {
      statedata.deleting = !statedata.deleting
    }
  }
}
</script>
