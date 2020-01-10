export default {
  colors: {
    any: '#a0a0a0',
    image: '#92d050',
    number: '#00b0f0',
    boolean: '#ff3fcc',
    text: '#d47b00'
  },
  casts: {
    image: ['any'],
    number: ['any', 'text', 'boolean'],
    boolean: ['any'],
    text: ['any', 'boolean']
  },
  isCastable (from, to) {
    if (from === to) return true
    if (this.casts[from] && this.casts[from].includes(to)) return true
    return false
  }
}
