import uuid from './uuid'

// TODO: Use ES6 classes

export function NodeInstance (component, spec) {
  return {
    id: uuid(),
    title: spec.title,
    // TODO: deep copy inputs and outputs arrays
    inputs: spec.inputs,
    outputs: spec.outputs,
    component,
    spec
  }
}

export function EdgeInstance (start, end, color) {
  return {
    id: uuid(),
    start,
    end,
    color
  }
}
