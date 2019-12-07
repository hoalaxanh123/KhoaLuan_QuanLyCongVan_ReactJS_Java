import {
  API_AFTER_LOGIN,
  // API_LOGIN,
  API_URL,
  API_NGUOIDUNG_ENDPOIN,
  USER_INFO,
  API_PAGE_LOGIN
} from '.'
import Message from '../method/Message'
import { trackPromise } from 'react-promise-tracker'
import axiosService from '../commons/axiosService'

export default class CommonMethods {
  static CheckLoged() {
    return this.checkCookie(USER_INFO)
  }
  static LogOut() {
    let logged = this.CheckLoged()
    if (logged) {
      this.setCookie(USER_INFO, '', -1)
      window.location.replace(API_PAGE_LOGIN)
    }
  }
  static getToken() {
    if (this.CheckLoged()) {
      let user = JSON.parse(this.getCookie(USER_INFO))
      return user.token
    }
    return undefined
  }
  static setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }
  static getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
  static checkCookie(cookieName) {
    return this.getCookie(cookieName) !== ''
  }
  static Login(username, password, remember = true) {
    trackPromise(
      axiosService
        .login(API_URL + API_NGUOIDUNG_ENDPOIN, {
          username: username,
          password: password,
          remember: remember
        })
        .then(res => {
          console.log('res :', res)
          if (res.status === 200) {
            let userLoged = {
              token:
                'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJIaWV1IiwiZXhwIjoxNTc2MTM0Mzc1fQ._zMBEuuz8ASD-rUJu-_AtXjaDG3BF3-ErpTbkA2k29tQVRkjCpkcTalNoym2YRuXxB22Rh58hQHQalD0sdWz3A',
              maTaiKhoan: 1,
              tenTaiKhoan: 'Hieu',
              hoTen: 'Nghiêm Xuân Hiếu',
              email: 'nghiemxuanhieu97@gmail.com',
              diaChi: 'Tô Ngọc Vân, Đà Lạt',
              phanQuyen: 'Admin',
              trangThai: 'false',
              sdt: '0367896040'
            }
            this.setCookie(
              USER_INFO,
              JSON.stringify(userLoged),
              remember ? 365 : 1
            )
            Message(
              'Đăng nhập thành công, vui lòng chờ',
              'success',
              3000,
              'Đăng nhập',
              'Login'
            )
            setTimeout(() => {
              window.location.replace(API_AFTER_LOGIN)
            }, 1000)
          } else {
            Message(
              'Sai tài khoản hoặc mật khẩu, vui lòng kiểm tra lại',
              'error',
              3000,
              'Đăng nhập lỗi',
              'Login'
            )
          }
        })
        .catch(function(error) {
          if (error.response) {
            Message(
              `Đã sảy ra vấn đề khi kết nối tới server, vui lòng kiểm tra lại<br/>
              -Chi tiết: ${error.response.status}-${error.response.data}
              `,
              'error',
              3000,
              'Đăng nhập lỗi',
              'Login'
            )
          }
        })
        .catch(error => {})
    )
  }
}
