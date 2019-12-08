import React, { Component } from 'react'
// import moment from 'moment'
import { Card, Form, Input, Button, Icon, message } from 'antd'
import CommonMethods from '../../constants/methods'
import { USER_INFO } from '../../constants'

class TaiKhoan extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    diaChi: '',
    email: '',
    hoTen: '',
    maTaiKhoan: '',
    password: '',
    phanQuyen: 'Member',
    sdt: '',
    username: '',
    trangThai: false,
    passwordMoi: '',
    xacNhanpasswordMoi: ''
  }

  UNSAFE_componentWillMount() {
    document.title = 'DLU | Tài khoản'
    let user = JSON.parse(CommonMethods.getCookie(USER_INFO))
    console.log('user :', user)
    this.setState({
      diaChi: user.diaChi,
      email: user.email,
      hoTen: user.hoTen,
      maTaiKhoan: user.maTaiKhoan,
      password: user.password,
      phanQuyen: user.phanQuyen,
      sdt: user.sdt,
      username: user.username,
      trangThai: user.trangThai,
      passwordMoi: '',
      xacNhanpasswordMoi: ''
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.passwordMoi !== values.xacNhanpasswordMoi) {
          message.error('Mật khẩu mới và xác nhận mật khẩu mới không khớp !', 3)
        } else {
          console.log('Received values of form: ', values)
        }
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
  onHandleChange = param => {
    var target = param.target
    var name = target.name
    var value
    value = target.value

    this.setState({
      [name]: value
    })
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props

    if (value && value !== form.getFieldValue('passwordMoi')) {
      callback('Mật khẩu mới và mật khẩu nhập lại không khớp')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['xacNhanpasswordMoi'], { force: true })
    }
    callback()
  }
  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
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

    return (
      <div>
        <Card type="inner" title="Tài khoản">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {/* ID */}
            {/* style={{display:'none'} }*/}
            <Form.Item label="Mã tài khoản" hasFeedback>
              {getFieldDecorator('maTaiKhoan', {
                initialValue: this.state.maTaiKhoan,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Mã tài khoản"
                  type="text"
                  title="Mã tài khoản"
                  disabled={true}
                />
              )}
            </Form.Item>

            {/* username */}
            <Form.Item label="Tên tài khoản" hasFeedback>
              {getFieldDecorator('username', {
                initialValue: this.state.username,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Tên tài khoản"
                  type="text"
                  title="Tên tài khoản"
                  name="username"
                  disabled={true}
                  readOnly={true}
                />
              )}
            </Form.Item>

            {/* Mat khau */}
            <Form.Item label="Mật khẩu" hasFeedback>
              {getFieldDecorator('password', {
                initialValue: this.state.password,
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu hiện tại !'
                  },
                  {
                    min: 6,
                    message: 'Mật khẩu ít nhất 6 ký tự !'
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Mật khẩu"
                  title="Mật khẩu"
                />
              )}
            </Form.Item>

            {/* Mat khau moi  */}
            <Form.Item label="Mật khẩu mới" hasFeedback>
              {getFieldDecorator('passwordMoi', {
                initialValue: this.state.passwordMoi,
                rules: [
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Mật khẩu mới"
                  title="Nếu muốn đổi mật khẩu, hãy nhập mật khẩu mới"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Form.Item>

            {/*Xac nhan Mat khau moi*/}
            <Form.Item label="Xác nhận mật khẩu mới" hasFeedback>
              {getFieldDecorator('xacNhanpasswordMoi', {
                initialValue: this.state.xacNhanpasswordMoi,
                rules: [
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Xác nhận mật khẩu mới"
                  title="Xác nhận mật khẩu mới"
                />
              )}
            </Form.Item>

            {/* Email */}
            <Form.Item label="Email" hasFeedback>
              {getFieldDecorator('email', {
                initialValue: this.state.email,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  },
                  {
                    type: 'email',
                    message: 'Vui lòng nhập email hợp lệ !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Email"
                  title="Email"
                />
              )}
            </Form.Item>

            {/* Ho ten */}
            <Form.Item label="Họ tên" hasFeedback>
              {getFieldDecorator('hoTen', {
                initialValue: this.state.hoTen,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Họ tên"
                  type="text"
                  title="Họ tên"
                />
              )}
            </Form.Item>

            {/* Số điện thoại */}
            <Form.Item label="SDT" hasFeedback>
              {getFieldDecorator('sdt', {
                initialValue: this.state.sdt,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="SDT"
                  type="number"
                  title="Số điện thoại"
                  name="sdt"
                />
              )}
            </Form.Item>

            {/* Dia Chi */}
            <Form.Item label="Địa chỉ" hasFeedback>
              {getFieldDecorator('diaChi', {
                initialValue: this.state.diaChi,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Địa chỉ"
                  type="text"
                  title="Địa chỉ"
                />
              )}
            </Form.Item>
            {/* Button */}
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" block>
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(TaiKhoan)
