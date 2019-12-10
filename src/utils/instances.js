import uuid from './uuid'

// TODO: Use ES6 classes

export function ConnectorInstance (spec) {
  this.id = uuid()
  this.name = spec.name
  this.type = spec.type
  this.variadic = spec.variadic
  if (this.variadic) {
    this.first = true
    this.last = true
  }
}

export function NodeInstance (component, spec) {
  this.id = uuid()
  this.title = spec.title
  this.inputs = spec.inputs.map(input => new ConnectorInstance(input))
  this.outputs = spec.outputs.map(output => new ConnectorInstance(output))
  this.component = component
  this.spec = spec
}

export function EdgeInstance (start, end, color) {
  return {
    id: uuid(),
    start,
    end,
    color
  }
}
