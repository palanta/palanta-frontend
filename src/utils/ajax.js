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

  static async binarize (image, threshold) {
    try {
      const result = await axios.get(`${backendUrl}/binarize?image=${image.id}&threshold=${threshold}`)
      return new BackendImage(result.data)
    } catch (err) {
      return undefined
    }
  }
}
