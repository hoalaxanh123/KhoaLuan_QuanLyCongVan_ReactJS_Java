import React, { Component } from 'react'
import { Card, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd'
import './index.css'

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
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
                      { required: true, message: 'Please input your username!' }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Username"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Please input your Password!' }
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
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(<Checkbox>Remember me</Checkbox>)}
                  <span
                    className="login-form-forgot Link"
                    href=""
                    style={{ float: 'right' }}
                  >
                    Forgot password
                  </span>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                  >
                    Log in
                  </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                  Or <span className="Link">register now!</span>
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
