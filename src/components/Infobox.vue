<template>
  <div class="justify-center infobox-wrapper">
    <q-card class="infobox">
      <q-card-section id="description">
        <div class="text-amber-1">
          <b>Welcome to the Palanta environment!</b>
          <br>
          Palanta is a visual programming language, that allows you to easily
          model your workflow without the need for actual programming.
          <br>
          <br>
          To get startet, simply open a category from the node explorer on the
          left and click on one of the available nodes. This node will then
          appear on the canvas, where it can be freely moved around.
          <br>
          Nodes can be connected using the connectors that indicated by small
          circles around the node.
          <br>
          <br>
          Each color represents a certain data type, for example a number or a
          text. An output can only be connected to an input of the same type.
          <br>
          <br>
          To input into the flow, use one of the nodes in the "Values" category.
          Current values can be viewed using the "Preview" node in the
          "Miscellaneous" category, which accepts all types of inputs.
          <br>
          <br>
          <i>Now your're all set. Enjoy using Palanta!</i>
        </div>
      </q-card-section>
      <q-btn color="primary"
             class="palanta-button"
             label="Palanta"
             icon="info"
             @click="$emit('infobox-toggle')"
      />
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Infobox'
}
</script>

<style scoped>
.infobox-wrapper {
  position: absolute;
  width: 100%;
}

.infobox {
  width: 500px;
  margin: 0 auto;
}

.palanta-button {
  width: 100%;
  font-size: 16px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
