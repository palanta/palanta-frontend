import uuid from './uuid'

export class ConnectorInstance {
  constructor (spec) {
    this.id = uuid()
    this.specId = spec instanceof ConnectorInstance ? spec.specId : spec.id
    this.name = spec.name
    this.type = spec.type
    this.variadic = spec.variadic
    this.bundle = spec.bundle
    if (this.variadic) this.last = true
  }
}

export class NodeInstance {
  constructor (component, spec, position) {
    this.id = uuid()
    this.title = spec.title
    this.inputs = spec.inputs.map(input => new ConnectorInstance(input))
    this.outputs = spec.outputs.map(output => new ConnectorInstance(output))
    this.component = component
    this.spec = spec
    this.position = position
  }
}

export class EdgeInstance {
  constructor (start, end, color, bundle) {
    this.id = uuid()
    this.start = start
    this.end = end
    this.color = color
    this.bundle = bundle
  }
}
