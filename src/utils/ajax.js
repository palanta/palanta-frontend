import axios from 'axios'

// TODO: properly specify
export const backendUrl = 'http://localhost:5000'

export class BackendImage {
  constructor (id) {
    this.id = id
    this.url = `${backendUrl}/images/${id}`
  }

  static async upload (file) {
    if (file) {
      const formData = new FormData()
      formData.append(file.filename, file)
      try {
        const result = await axios.post(`${backendUrl}/images`, formData)
        return new BackendImage(result.data)
      } catch (err) {
        return undefined
      }
    } else return undefined
  }

  async info () {
    try {
      const result = await axios.get(`${backendUrl}/info?image=${this.id}`)
      return result.data
    } catch (err) {
      return undefined
    }
  }

  async binarized (threshold) {
    try {
      const result = await axios.get(`${backendUrl}/binarize?image=${this.id}&threshold=${threshold}`)
      return new BackendImage(result.data)
    } catch (err) {
      return undefined
    }
  }

  async otsu () {
    try {
      const result = await axios.get(`${backendUrl}/otsu?image=${this.id}`)
      return parseFloat(result.data)
    } catch (err) {
      return undefined
    }
  }

  async greyscaled () {
    try {
      const result = await axios.get(`${backendUrl}/greyscale?image=${this.id}`)
      return new BackendImage(result.data)
    } catch (err) {
      return undefined
    }
  }

  async inverted () {
    try {
      const result = await axios.get(`${backendUrl}/invert?image=${this.id}`)
      return new BackendImage(result.data)
    } catch (err) {
      return undefined
    }
  }

  async ocr () {
    try {
      const result = await axios.get(`${backendUrl}/ocr?image=${this.id}`)
      return result.data
    } catch (err) {
      return undefined
    }
  }
}
