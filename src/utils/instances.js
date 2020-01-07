import uuid from './uuid'

export class ConnectorInstance {
  constructor (spec) {
    this.id = uuid()
    this.value = undefined
    this.specId = spec instanceof ConnectorInstance ? spec.specId : spec.id
    this.name = spec.name
    this.type = spec.type
    this.variadic = spec.variadic
    if (this.variadic) this.last = true
  }
}

export class NodeInstance {
  constructor (component, spec, position) {
    this.id = uuid()
    this.spec = spec
    this.title = spec.title
    this.inputs = spec.inputs.map(input => new ConnectorInstance(input))
    this.outputs = spec.outputs.map(output => new ConnectorInstance(output))
    this.component = component
    this.position = position
    this.calculate = spec.calculate ? spec.calculate.bind(this) : () => undefined
  }

  getConnector (channel, id) {
    const connectors = channel.filter(connector => connector.specId === id)
    if (!connectors.length) throw new Error(`${this.id}.${id} is not defined`)
    if (connectors[0].variadic) return connectors
    else {
      if (connectors.length === 1) return connectors[0]
      else throw new Error(`${this.id}.${id} is ambiguous`)
    }
  }

  input (id) {
    return this.getConnector(this.inputs, id)
  }

  output (id) {
    return this.getConnector(this.outputs, id)
  }
}

export class EdgeInstance {
  constructor (start, end, color) {
    this.id = uuid()
    this.start = start
    this.end = end
    this.color = color
  }

  transport () {
    this.end.spec.value = this.start.spec.value
  }

  clear () {
    this.end.spec.value = undefined
  }
}
