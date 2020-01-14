import uuid from './uuid'

export class ConnectorInstance {
  constructor (spec) {
    this.id = uuid()
    this.specId = spec instanceof ConnectorInstance ? spec.specId : spec.id
    this.name = spec.name
    this.type = spec.type
    this.variadic = spec.variadic
    this.bundle = spec.bundle
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
    // initialize variadic counts
    const channels = [this.inputs, this.outputs]
    channels.forEach(channel => {
      channel.counts = {}
      channel.connected = {}
      for (let i in channel) {
        const connector = channel[i]
        if (connector.variadic) {
          // Allow truthy values or numbers as variadics
          connector.variadic = connector.variadic instanceof Object ? connector.variadic : { minimum: 1, collapse: true }
          // Variadic defaults:
          if (!('minimum' in connector.variadic)) connector.variadic.minimum = 1
          if (!('collapse' in connector.variadic)) connector.variadic.collapse = true

          channel.counts[connector.specId] = connector.variadic.minimum
          for (let j = 0; j < channel.counts[connector.specId] - 1; ++j) {
            channel.splice(i + j + 1, 0, new ConnectorInstance(connector))
          }
        }
      }
    })
  }
}

export class EdgeInstance {
  constructor (start, end, bundle) {
    this.id = uuid()
    this.start = start
    this.end = end
    this.bundle = bundle
  }
}
