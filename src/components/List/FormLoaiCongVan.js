import React, { Component } from 'react'
import { Modal } from 'antd'
import { Input, Form, Icon, Button } from 'antd'
import { EDIT_LOAICONGVAN, ADD_LOAICONGVAN } from '../../constants/task'
class FormAction extends Component {
  state = {
    visible: false,
    TitleForm: '',
    action: ADD_LOAICONGVAN,
    tenLoai: '',
    moTa: '',
    maLoai: ''
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
      tenLoai: '',
      moTa: '',
      maLoai: '',
      displayForm: false
    })
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (this.props !== nextProp) {
      if (nextProp.action === EDIT_LOAICONGVAN) {
        this.setState({
          displayForm: nextProp.displayForm,
          TitleForm: nextProp.titleForm,
          action: nextProp.action,
          maLoai: nextProp.selectedObj.maLoai,
          tenLoai: nextProp.selectedObj.tenLoai,
          moTa: nextProp.selectedObj.moTa
        })
      } else {
        this.setState({
          displayForm: nextProp.displayForm,
          TitleForm: nextProp.titleForm,
          action: nextProp.action,
          maLoai: '',
          tenLoai: '',
          moTa: ''
        })
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }
  resetForm = () => {
    this.setState({
      tenLoai: '',
      moTa: '',
      maLoai: ''
    })
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

  UNSAFE_componentWillMount() {
    this.resetForm()
  }
  render() {
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
            {/* TenLoai */}
            <Form.Item label="Tên loại" hasFeedback>
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Tên loại"
                type="text"
                title="Tên loại"
                name="tenLoai"
                value={this.state.tenLoai}
                required
                onChange={this.onHandleChange}
              />
            </Form.Item>

            {/* MoTa */}
            <Form.Item label="Mô tả" hasFeedback>
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Mô tả"
                type="text"
                title="Mô tả"
                name="moTa"
                value={this.state.moTa}
                required
                onChange={this.onHandleChange}
              />
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

export default Form.create()(FormAction)
