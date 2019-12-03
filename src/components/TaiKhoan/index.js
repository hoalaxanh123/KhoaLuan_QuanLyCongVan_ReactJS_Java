import React, { Component } from 'react'
// import moment from 'moment'
import { Card, Form, Input, Button, Select } from 'antd'
const { Option } = Select

class TaiKhoan extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  handleWebsiteChange = value => {
    let autoCompleteResult
    if (!value) {
      autoCompleteResult = []
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      )
    }
    this.setState({ autoCompleteResult })
  }
  componentDidMount() {
    if (window.innerWidth > 600) {
      this.setState({ width: 6 })
    } else {
      this.setState({ width: 24 })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }
    const tailFormItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8, offset: 8 }
    }
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '84'
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="-1">Khác</Option>
      </Select>
    )

    return (
      <div>
        <Card type="inner" title="Tài khoản">
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            labelAlign="left"
            labelCol={{ span: 24, offset: 0 }}
          >
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Vui lòng nhập E-mail hợp lệ!'
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập E-mail!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Mật khẩu" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập password!'
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Nhập lại mật khẩu" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Nhập lại mật khẩu!'
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label={'Tên đăng nhập'}>
              {getFieldDecorator('nickname', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập tên đăng nhập!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: 'Please input your phone number!' }
                ]
              })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(TaiKhoan)
