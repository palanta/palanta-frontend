import uuid from './uuid'

export class NodeInstance {
  constructor (component, spec) {
    this.id = uuid()
    this.title = spec.title
    // TODO: deep copy inputs and outputs arrays
    this.inputs = spec.inputs
    this.outputs = spec.outputs
    this.component = component
    this.spec = spec
  }
}

export class EdgeInstance {
  constructor (start, end, color) {
    this.id = uuid()
    this.start = start
    this.end = end
    this.color = color
  }
}
