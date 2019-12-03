import React, { Component } from 'react'
import { trackPromise } from 'react-promise-tracker'
import { Card, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd'
import './index.css'
import axiosService from '../../commons/axiosService'
import { API_LOGIN, API_AFTER_LOGIN } from '../../constants'
import Message from '../../method/Message'

class Login extends Component {
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
    if (logged) window.location.replace(API_AFTER_LOGIN)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Row>
        <Col span={7} className="LoginForm">
          <Card>
            <center>
              <h1 className="login-title">Đăng nhập hệ thống</h1>
            </center>
            <h2>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập tên đăng nhập!'
                      },
                      {
                        whitespace: true,
                        message: 'Tên đăng nhập không có khoảng trắng!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Tên đăng nhập"
                      title="Tên đăng nhập"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Vui lòng nhập mật khẩu!' },
                      { min: 6, message: 'Mật khẩu ít nhất 6 ký tự' }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Mật khẩu"
                      title="Mật khẩu"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('rememberMe', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(<Checkbox>Nhớ tài khoản</Checkbox>)}
                  <span
                    className="login-form-forgot Link"
                    href=""
                    style={{ float: 'right' }}
                  >
                    Quên mật khẩu
                  </span>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                  Hoặc <span className="Link">đăng ký ngay!</span>
                </Form.Item>
              </Form>
            </h2>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Form.create({ name: 'normal_login' })(Login)
