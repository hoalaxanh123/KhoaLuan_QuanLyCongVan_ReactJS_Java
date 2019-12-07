import React, { Component } from 'react'
import { Card, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd'
import './index.css'
import CommonMethods from '../../constants/methods'

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        CommonMethods.Login(values.username, values.password, values.rememberMe)
      }
    })
  }
  UNSAFE_componentWillMount() {}
  render() {
    const { getFieldDecorator } = this.props.form
    let titile =
      window.location.pathname !== '/dang-nhap'
        ? 'Vui lòng đăng nhập để sử dụng hệ thống'
        : ''
    return (
      <Row>
        <Col span={7} className="LoginForm">
          <center>
            <h2 style={{ color: 'red' }}>{titile}</h2>
          </center>
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
