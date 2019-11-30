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
    matKhau: '',
    phanQuyen: 'Member',
    sdt: '',
    tenTaiKhoan: '',
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
      matKhau: '',
      phanQuyen: 'Member',
      sdt: '',
      tenTaiKhoan: '',
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
          matKhau: nextProp.selectedObj.matKhau,
          phanQuyen: nextProp.selectedObj.phanQuyen,
          sdt: nextProp.selectedObj.sdt,
          tenTaiKhoan: nextProp.selectedObj.tenTaiKhoan,
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
          matKhau: '',
          sdt: '',
          tenTaiKhoan: '',
          phanQuyen: 'Member',
          trangThai: true
        })
      }
    }
  }

  CheckExistUserName(userName) {
    let lst = this.props.listNguoiDung
    return lst.find(x => x.tenTaiKhoan === userName) ? true : false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.tenTaiKhoan.includes(' ')) {
      Message(
        'Lỗi<br/>Hành động:Thêm tài khoản<br/>Mô tả: Tên tài không được có dấu cách',
        'error',
        5
      )
      return
    }
    if (this.state.matKhau.length < 6) {
      Message(
        'Lỗi<br/>Hành động: Thêm tài khoản<br/>Mô tả: Mật khẩu ít nhất 6 ký tự',
        'error',
        5
      )
      return
    }
    if (
      this.state.action === ADD_NGUOIDUNG &&
      this.CheckExistUserName(this.state.tenTaiKhoan)
    ) {
      Message(
        '<b>Lỗi</b><br/>Hành động:Thêm tài khoản<br/>Mô tả: Tên tài khoản đã tồn tại',
        'error',
        5
      )
      return
    }
    this.props.onSubmit(this.state)
  }
  resetForm = () => {
    this.setState({
      diaChi: '',
      email: '',
      hoTen: '',
      maTaiKhoan: '',
      matKhau: '',
      phanQuyen: '',
      sdt: '',
      tenTaiKhoan: '',
      trangThai: false
    })
  }
  onHandleChange = (param, sdasd) => {
    console.log('param :', param)
    console.log('sdasd :', sdasd)
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
            {/* TenTaiKhoan */}
            <Form.Item label="Tên tài khoản">
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Tên tài khoản"
                type="text"
                title="Tên tài khoản"
                name="tenTaiKhoan"
                value={this.state.tenTaiKhoan}
                required
                onChange={this.onHandleChange}
                disabled={isEditing}
                readOnly={isEditing}
              />
            </Form.Item>

            {/* Mat khau */}
            <Form.Item label="Mật khẩu">
              <Input.Password
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Mật khẩu"
                title="Mật khẩu"
                name="matKhau"
                value={isEditing ? `Can't see that` : this.state.matKhau}
                required
                onChange={this.onHandleChange}
              />
            </Form.Item>

            {/* Email */}
            <Form.Item label="Email">
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
            <Form.Item label="Họ tên">
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
            <Form.Item label="SDT">
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
            <Form.Item label="Địa chỉ">
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
            <Form.Item label="Phân quyền">
              <Select
                showSearch
                placeholder="Vui lòng chọn quyền"
                onChange={this.onHandlePhanQuyen}
                defaultValue={this.state.phanQuyen}
                name="phanQuyen"
              >
                <Option value="Admin">Quản trị viên</Option>
                <Option value="Member">Thành viên</Option>
              </Select>
            </Form.Item>

            {/* TrangThai */}
            <Form.Item label="Trạng thái">
              <Select
                showSearch
                placeholder="Vui lòng chọn trạng thái"
                onChange={this.onHandleTrangThai}
                defaultValue={this.state.trangThai}
                name="trangThai"
              >
                <Option value={true}>Kích hoạt</Option>
                <Option value={false}>Huỷ kích hoạt</Option>
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
