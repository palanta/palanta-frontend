<template>
  <div/>
</template>

<script>
export default {
  spec: {
    id: 'std::xnor',
    title: 'Xnor',
    icon: require('../../../assets/node_icons/node_biconditional.svg'),
    inputs: [
      {
        id: 'boolean',
        name: 'Boolean',
        type: 'boolean',
        variadic: {
          minimum: 2
        }
      }
    ],
    outputs: [
      {
        id: 'result',
        name: 'Result',
        type: 'boolean'
      }
    ],
    calculate (input) {
      const booleans = input.boolean.filter(booleans => !isNaN(booleans))
      let result = true
      if (booleans.length > 1) {
        let bool1 = booleans.shift()
        let bool2 = booleans.shift()
        if (bool1 !== bool2) { result = false }
        for (let bool of booleans) {
          booleans.shift()
          if (bool !== result) result = true
          else result = false
        }
      }
      return { result }
    }
  }
}
</script>
