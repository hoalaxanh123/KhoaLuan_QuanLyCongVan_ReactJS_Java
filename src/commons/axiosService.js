import axios from 'axios'

class AxiosService {
  constructor(props) {
    const intance = axios.create()
    intance.interceptors.response.use(this.handleSuccess, this.handleError)
    this.intance = intance
  }

  handleSuccess(res) {
    return res
  }
  handleError(error) {
    return Promise.reject(error)
  }

  get(url) {
    return this.intance.get(url)
  }
  delete(url) {
    return this.intance.delete(url)
  }
  post(url, task) {
    return this.intance.post(url, task)
  }
}
export default new AxiosService()
//
