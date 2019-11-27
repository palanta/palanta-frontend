import crypto from 'crypto'

const DEFAULT_BYTES = 18

export default function (bytes = DEFAULT_BYTES) {
  return crypto.randomBytes(bytes).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}
