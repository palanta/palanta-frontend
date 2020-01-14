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
    calculate () {
      let root = 0
      let number = this.input('number').value
      let degree = this.input('degree').value
      if (!isNaN(number)) {
        if (!isNaN(degree)) {
          root = Math.pow(number, 1 / degree)
        } else root = Math.sqrt(number)
      }
      this.output('root').value = root
    }
  }
}
</script>
