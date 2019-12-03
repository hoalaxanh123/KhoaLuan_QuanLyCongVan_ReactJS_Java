import React, { Component } from 'react'
import { API_AFTER_LOGIN, API_LOGIN, API_PAGE_LOGIN } from '../../constants'
import Message from '../../method/Message'

class Logout extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('values :', values)
        // console.log('typeof(values) :', typeof(values));
        // trackPromise(
        //   axiosService
        //     .post(API_LOGIN, values)
        //     .then(res => {
        //       console.log('res :', res)
        //     })
        //     .catch(error => {})
        // )
        if (values.username === 'Hieu' && values.password === '123456') {
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
          localStorage.setItem('userName', JSON.stringify(userLoged))
          Message(
            'Đăng nhập thành công, vui lòng chờ',
            'success',
            3000,
            'Đăng nhập',
            'Login'
          )
          setTimeout(() => {
            window.location.replace('http://localhost:1414')
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
      }
    })
  }
  UNSAFE_componentWillMount() {
    let logged = localStorage.getItem('userName')
    if (logged) {
      localStorage.removeItem('userName')
      window.location.replace(API_PAGE_LOGIN)
    }
  }
  render() {
    return <div></div>
  }
}
export default Logout
