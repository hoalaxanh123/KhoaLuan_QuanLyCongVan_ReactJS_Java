import axios from 'axios'
import { USER_INFO } from '../constants'
import CommonMethods from '../constants/methods'

class AxiosService {
  getToken() {
    try {
      let user = JSON.parse(CommonMethods.getCookie(USER_INFO))
      console.log('------user.token :', user.token)
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
  put(url, task) {
    return this.intance.put(url, task, {
      headers: { Authorization: 'Bearer ' + this.getToken() }
    })
  }
  login(url, task) {
    console.log('task :', task)
    return this.intance.post(url, task)
    // return this.intance.post(url,task, {
    //   headers: { Authorization: 'Bearer ' + this.getToken() }
    // })
  }
}
export default new AxiosService()
//
