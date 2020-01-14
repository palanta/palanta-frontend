<template>
  <div/>
</template>

<script>

export default {
  spec: {
    id: 'std::root',
    title: 'Root',
    icon: require('../../../assets/node_icons/node_root.svg'),
    inputs: [
      {
        id: 'number',
        name: 'Number',
        type: 'number'
      },
      {
        id: 'degree',
        name: 'Degree',
        type: 'number'
      }
    ],
    outputs: [
      {
        id: 'root',
        name: 'Root',
        type: 'number'
      }
    ],
    calculate (input) {
      let root = 0
      if (!isNaN(input.number)) {
        if (!isNaN(input.degree)) {
          root = Math.pow(input.number, 1 / input.degree)
        } else root = Math.sqrt(input.number)
      }
      return { root }
    }
  }
}
</script>
