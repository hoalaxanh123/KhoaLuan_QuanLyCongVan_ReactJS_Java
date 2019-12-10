import axios from 'axios'
import { USER_INFO } from '../constants'
import CommonMethods from '../constants/methods'

class AxiosService {
  getToken() {
    try {
      let user = JSON.parse(CommonMethods.getCookie(USER_INFO))
      return user.token
    } catch (error) {
      return ''
    }
  }
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
    return this.intance.get(url, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
  }
  getHasParam(url, task) {
    console.log('task :', task)
    return this.intance.get(url, task, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
  delete(url) {
    return this.intance.delete(url, {
      headers: { Authorization: 'Bearer ' + this.getToken() }
    })
  }
  post(url, task) {
    return this.intance.post(url, task, {
      headers: { Authorization: 'Bearer ' + this.getToken() }
    })
  }
  postWitoutAuthen(url, task) {
    return this.intance.post(url, task)
  }
  put(url, task) {
    return this.intance.put(url, task, {
      headers: { Authorization: 'Bearer ' + this.getToken() }
    })
  }
  login(url, task) {
    return this.intance.post(url, task)
  }
}
export default new AxiosService()
//
