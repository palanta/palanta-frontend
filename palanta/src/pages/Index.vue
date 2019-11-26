<template>
  <div>
    <div class="toolbox-container">
      <div class="toolbox-node" @click="addCard({ title: 'Binarize', inputs: [{ name: 'Image' }, { name: 'Threshold' }], outputs: [{ name: 'Image' }] })">
        Binarize
      </div>
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
      @mouseleave="onCardDragEnd()"
    >

      <svg id="line" width="5000" height="5000" :style="`position: absolute; left: 0; top: 0;`">
        <line
          :x1="connectStart.x" :y1="connectStart.y"
          :x2="connectStart.x + connectOffset.x" :y2="connectStart.y + connectOffset.y"
        />
      </svg>

      <p-node
        v-for="(node, index) in nodelist" :key="index"
        :spec="node"
        :x=400
        :y=300
        @connect="onConnect"
      >
        lel
      </p-node>

      <p-node :spec="{title: 'kek', inputs: [], outputs: []}" ref="testNode">
        <q-input filled />
      </p-node>

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
  line {
    stroke: #ff00ff;
    stroke-width: 4;
  }
</style>

<script>

import PNode from '../components/Node'

export default {
  name: 'PageIndex',
  components: {
    PNode
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
      },
      connectStart: { x: 0, y: 0 },
      connectOffset: { x: 0, y: 0 }
    }
  },
  methods: {
    onConnect (event) {
      this.connectStart = {
        x: event.connector.$el.offsetLeft,
        y: event.connector.$el.offsetTop
      }
      this.connectOffset = event.offset
      console.log(event)
    },
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
      this.nodelist.push({ type, title: type, inputs: [{ name: 'Image' }, { name: 'Threshold' }], outputs: [{ name: 'Image' }], offsetLeft: '200px', offsetTop: '50px' })
    },
    addCard: function (spec) {
      this.nodelist.push(spec)
    },
    removeActiveCard: function (index) {
      this.nodelist.splice(index, 1)
    }
  }
}
</script>
