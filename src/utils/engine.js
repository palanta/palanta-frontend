import uuid from './uuid'

export default class Engine {
  constructor (callback) {
    this.computeQueue = []
    this.computing = new Set()
    this.computations = {}
    this.callback = callback
  }

  queueNode (node, dependsOn, notDependsOn) {
    const index = this.computeQueue.findIndex(element => element.node === node)
    let dependencies = dependsOn ? [dependsOn] : []
    if (index >= 0) {
      const previous = this.computeQueue.splice(index, 1)[0]
      dependencies = previous.dependencies.concat(dependencies)
    }
    const deprecatedIndex = dependencies.indexOf(notDependsOn)
    if (deprecatedIndex >= 0) dependencies.splice(deprecatedIndex, 1)
    node.computing = true
    return this.computeQueue.push({ dependencies, node }) - 1
  }

  queueComputation (start, dependsOn, notDependsOn) {
    // Traverse canvas breadth-first to determine update order
    let index = this.queueNode(start, dependsOn, notDependsOn)
    while (index < this.computeQueue.length) {
      const node = this.computeQueue[index].node
      const nextNodes = new Set(node.edges.filter(edge => edge.start.node === node).map(edge => edge.end.node))
      nextNodes.forEach(next => this.queueNode(next, node))
      index++
    }
    this.compute()
  }

  async compute () {
    // A node is considered ready when no dependency is either scheduled or being computed
    const ready = entry => {
      for (let dependency of entry.dependencies) {
        if (this.computing.has(dependency)) return false
        if (this.computeQueue.find(entry => entry.node === dependency)) return false
      }
      return true
    }
    // Start all computations that are ready
    const readyEntries = this.computeQueue.filter(ready)
    readyEntries.forEach(entry => this.computeQueue.splice(this.computeQueue.indexOf(entry), 1))
    const promises = readyEntries.map(async entry => {
      this.computing.add(entry.node)

      // Process node
      const calculationId = uuid()
      this.computations[entry.node.id] = calculationId

      const result = await entry.node.calculate()

      if (calculationId === this.computations[entry.node.id]) {
        entry.node.applyCalculation(result)
        const outEdges = entry.node.edges.filter(edge => edge.start.node === entry.node)
        outEdges.forEach(edge => edge.transport())

        this.computing.delete(entry.node)
        if (this.computeQueue.findIndex(newEntry => newEntry.node === entry.node) === -1) {
          entry.node.computing = false
          await this.callback(entry.node)
        }
      }
    })
    // Repeat as long as queue is not empty
    if (promises.length) {
      await Promise.all(promises)
      return this.compute()
    }
  }
}
