import uuid from './uuid'

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
