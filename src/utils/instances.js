import uuid from './uuid'

export class ConnectorInstance {
  constructor (spec) {
    this.id = uuid()
    this.specId = spec instanceof ConnectorInstance ? spec.specId : spec.id
    this.name = spec instanceof ConnectorInstance ? spec.specName : spec.name
    this.specName = this.name
    this.type = spec.type
    this.variadic = spec.variadic
    this.bundle = spec.bundle
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

    this.calculate = spec.calculate ? this.mapCalculate(spec.calculate) : () => undefined

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

  mapCalculate (calculate) {
    return async component => {
      // Create input map
      const input = {}
      const inputIds = new Set(this.inputs.map(connector => connector.specId))
      inputIds.forEach(id => { input[id] = this.input(id) })
      for (let id in input) {
        if (input[id] instanceof Array) input[id] = input[id].map(connector => connector.value)
        else input[id] = input[id].value
      }
      // Execute node computation
      return calculate.bind(this)(input, component)
    }
  }

  applyCalculation (result) {
    // Retreive output map
    const outputIds = new Set(this.outputs.map(connector => connector.specId))
    outputIds.forEach(id => {
      const output = this.output(id)
      if (output instanceof Array) {
        if (result[id]) {
          if (!(result[id] instanceof Array)) throw new Error(`Output ${id} of ${this.title} node is expected to be variadic, but is not`)
          output.forEach((connector, index) => { connector.value = result[id][index] })
        } else output.forEach((connector, index) => { connector.value = undefined })
      } else output.value = result && result[id]
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

  transport () {
    this.end.spec.value = this.start.spec.value
  }

  clear () {
    this.end.spec.value = undefined
  }
}
