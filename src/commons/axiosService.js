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
      headers: { Authorization: 'bearer ' + this.getToken() }
    })
  }
  delete(url) {
    return this.intance.delete(url, {
      headers: { Authorization: 'bearer ' + this.getToken() }
    })
  }
  post(url, task) {
    return this.intance.post(url, task, {
      headers: { Authorization: 'bearer ' + this.getToken() }
    })
  }
  put(url, task) {
    return this.intance.put(url, task, {
      headers: { Authorization: 'bearer ' + this.getToken() }
    })
  }
  login(url, task) {
    console.log('task :', task)
    return this.intance.get(url)
    // return this.intance.post(url,task, {
    //   headers: { Authorization: 'bearer ' + this.getToken() }
    // })
  }
}
export default new AxiosService()
//
