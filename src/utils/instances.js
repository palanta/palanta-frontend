import uuid from './uuid'

// TODO: Use ES6 classes

export function NodeInstance (component, spec) {
  this.id = uuid()
  this.title = spec.title
  // TODO: rather hacky deep copy, using some library might be better
  this.inputs = JSON.parse(JSON.stringify(spec.inputs))
  this.outputs = JSON.parse(JSON.stringify(spec.outputs))
  this.component = component
  this.spec = spec

  const channels = [this.inputs, this.outputs]
  channels.forEach(channel => channel.forEach(connector => {
    connector.id = uuid()
    if (connector.variadic) {
      connector.first = true
      connector.last = true
    }
  }))
}

export function EdgeInstance (start, end, color) {
  return {
    id: uuid(),
    start,
    end,
    color
  }
}
