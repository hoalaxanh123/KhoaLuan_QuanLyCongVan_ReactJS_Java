import React, { Component } from 'react'
import { Modal } from 'antd'
import { Input, Form, Icon, Button, Select } from 'antd'

import { EDIT_NGUOIDUNG, ADD_NGUOIDUNG } from '../../constants/task'
import Message from '../../method/Message'
const { Option } = Select

class FormUser extends Component {
  state = {
    visible: false,
    TitleForm: '',
    action: ADD_NGUOIDUNG,
    diaChi: '',
    email: '',
    hoTen: '',
    maTaiKhoan: '',
    password: '',
    phanQuyen: 'Member',
    sdt: '',
    username: '',
    trangThai: false
  }

  showModal = () => {
    this.setState({
      displayForm: true
    })
  }

  handleOkForm = e => {
    this.setState({
      displayForm: false
    })
  }

  handleCancelForm = e => {
    this.setState({
      diaChi: '',
      email: '',
      hoTen: '',
      maTaiKhoan: '',
      password: '',
      phanQuyen: 'Member',
      sdt: '',
      username: '',
      trangThai: true,
      displayForm: false
    })
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (this.props !== nextProp) {
      if (nextProp.action === EDIT_NGUOIDUNG) {
        this.setState({
          displayForm: nextProp.displayForm,
          TitleForm: nextProp.titleForm,
          action: nextProp.action,
          diaChi: nextProp.selectedObj.diaChi,
          email: nextProp.selectedObj.email,
          hoTen: nextProp.selectedObj.hoTen,
          maTaiKhoan: nextProp.selectedObj.maTaiKhoan,
          password: nextProp.selectedObj.password,
          phanQuyen: nextProp.selectedObj.phanQuyen,
          sdt: nextProp.selectedObj.sdt,
          username: nextProp.selectedObj.username,
          trangThai: nextProp.selectedObj.trangThai
        })
      } else {
        this.setState({
          displayForm: nextProp.displayForm,
          TitleForm: nextProp.titleForm,
          action: nextProp.action,
          diaChi: '',
          email: '',
          hoTen: '',
          maTaiKhoan: '',
          password: '',
          sdt: '',
          username: '',
          phanQuyen: 'Member',
          trangThai: true
        })
      }
    }
  }

  CheckExistUserName(userName) {
    let lst = this.props.listNguoiDung
    return lst.find(x => x.username === userName) ? true : false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.username.includes(' ')) {
      Message(
        'Tên tài không được có dấu cách',
        'error',
        3000,
        'ERROR',
        'Thêm tài khoản'
      )
      return
    }
    if (this.state.password.length < 6) {
      Message(
        'Mật khẩu phải có ít nhất 6 ký tự !',
        'error',
        3000,
        'ERROR',
        'Thêm tài khoản'
      )
      return
    }
    if (
      this.state.action === ADD_NGUOIDUNG &&
      this.CheckExistUserName(this.state.username)
    ) {
      Message(
        'Tên tài khoản đã tồn tại !',
        'error',
        3000,
        'ERROR',
        'Thêm tài khoản'
      )
      return
    }
    this.setState({
      trangThai: this.state.trangThai === 'true'
    })
    this.props.onSubmit(this.state)
  }
  resetForm = () => {
    this.setState({
      diaChi: '',
      email: '',
      hoTen: '',
      maTaiKhoan: '',
      password: '',
      phanQuyen: '',
      sdt: '',
      username: '',
      trangThai: false
    })
  }
  onHandleChange = (param, sdasd) => {
    var target = param.target
    var name = target.name
    var value
    value = target.value

    this.setState({
      [name]: value
    })
  }
  onHandlePhanQuyen = value => {
    this.setState({
      phanQuyen: value
    })
  }

  onHandleTrangThai = value => {
    this.setState({
      trangThai: value
    })
  }

  UNSAFE_componentWillMount() {
    this.resetForm()
  }
  render() {
    let isEditing = this.state.action === EDIT_NGUOIDUNG ? true : false
    return (
      <div>
        <Modal
          title={this.state.TitleForm}
          visible={this.state.displayForm}
          onOk={this.handleOkForm}
          onCancel={this.handleCancelForm}
          footer={[
            <Button key="back" onClick={this.resetForm}>
              Reset
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            {/* username */}
            <Form.Item label="Tên tài khoản" hasFeedback>
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Tên tài khoản"
                type="text"
                title="Tên tài khoản"
                name="username"
                value={this.state.username}
                required
                onChange={this.onHandleChange}
                disabled={isEditing}
                readOnly={isEditing}
              />
            </Form.Item>

            {/* Mat khau */}
            <Form.Item label="Mật khẩu" hasFeedback>
              <Input.Password
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Mật khẩu"
                title="Mật khẩu"
                name="password"
                value={isEditing ? `Can't see that` : this.state.password}
                required
                onChange={this.onHandleChange}
              />
            </Form.Item>

            {/* Email */}
            <Form.Item label="Email" hasFeedback>
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
                type="email"
                title="Email"
                name="email"
                value={this.state.email}
                required
                allowClear={true}
                onChange={this.onHandleChange}
              />
            </Form.Item>

            {/* Ho ten */}
            <Form.Item label="Họ tên" hasFeedback>
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Họ tên"
                type="text"
                title="Họ tên"
                name="hoTen"
                value={this.state.hoTen}
                required
                allowClear={true}
                onChange={this.onHandleChange}
              />
            </Form.Item>

            {/* Số điện thoại */}
            <Form.Item label="SDT" hasFeedback>
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="SDT"
                type="number"
                title="Số điện thoại"
                name="sdt"
                value={this.state.sdt}
                required
                onChange={this.onHandleChange}
              />
            </Form.Item>

            {/* Dia Chi */}
            <Form.Item label="Địa chỉ" hasFeedback>
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Địa chỉ"
                type="text"
                title="Địa chỉ"
                name="diaChi"
                value={this.state.diaChi}
                onChange={this.onHandleChange}
              />
            </Form.Item>

            {/* Phân quyền */}
            <Form.Item label="Phân quyền" hasFeedback>
              <Select
                showSearch
                placeholder="Vui lòng chọn quyền"
                onChange={this.onHandlePhanQuyen}
                defaultValue={this.state.phanQuyen}
                value={this.state.phanQuyen}
                name="phanQuyen"
              >
                <Option value="Admin">Quản trị viên</Option>
                <Option value="Member">Thành viên</Option>
              </Select>
            </Form.Item>

            {/* TrangThai */}
            <Form.Item label="Trạng thái" hasFeedback>
              <Select
                showSearch
                placeholder="Vui lòng chọn trạng thái"
                onChange={this.onHandleTrangThai}
                defaultValue={this.state.trangThai.toString()}
                value={this.state.trangThai.toString()}
                name="trangThai"
              >
                <Option value={'true'}>Kích hoạt</Option>
                <Option value={'false'}>Huỷ kích hoạt</Option>
              </Select>
            </Form.Item>

            {/* Button submit*/}
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(FormUser)
