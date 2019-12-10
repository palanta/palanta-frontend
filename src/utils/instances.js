import uuid from './uuid'

export class ConnectorInstance {
  constructor (spec) {
    this.id = uuid()
    this.specId = spec instanceof ConnectorInstance ? spec.specId : spec.id
    this.name = spec.name
    this.type = spec.type
    this.variadic = spec.variadic
    if (this.variadic) this.last = true
  }
}

export class NodeInstance {
  constructor (component, spec) {
    this.id = uuid()
    this.title = spec.title
    this.inputs = spec.inputs.map(input => new ConnectorInstance(input))
    this.outputs = spec.outputs.map(output => new ConnectorInstance(output))
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
