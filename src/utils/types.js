export default {
  colors: {
    any: '#a0a0a0',
    image: '#92d050',
    number: '#00b0f0',
    boolean: '#ff3fcc',
    text: '#d47b00'
  },
  casts: {
    'any': ['any', 'image', 'number', 'boolean', 'text'],
    'image': ['any'],
    'number': ['any'],
    'boolean': ['any', 'number', 'text'],
    'text': ['any', 'number']
  },
  isCastable (from, to) {
    if (from === to) return true
    if (this.casts[to] && this.casts[to].includes(from)) return true
    return false
  }
}
