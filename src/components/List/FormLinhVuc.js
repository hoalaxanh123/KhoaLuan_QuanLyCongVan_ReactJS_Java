import React, { Component } from 'react'
import { Modal } from 'antd'
import { Input, Form, Icon, Button } from 'antd'
import { EDIT_LINHVUC, ADD_LINHVUC } from '../../constants/task'
class FormLinhVuc extends Component {
  state = {
    visible: false,
    TitleForm: '',
    action: ADD_LINHVUC,
    tenLinhVuc: '',
    maLinhVuc: '',
    tenVietTat: ''
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
      tenLinhVuc: '',
      maLinhVuc: '',
      tenVietTat: '',
      displayForm: false
    })
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (this.props !== nextProp) {
      if (nextProp.action === EDIT_LINHVUC) {
        this.setState({
          displayForm: nextProp.displayForm,
          TitleForm: nextProp.titleForm,
          action: nextProp.action,
          tenLinhVuc: nextProp.selectedObj.tenLinhVuc,
          maLinhVuc: nextProp.selectedObj.maLinhVuc,
          tenVietTat: nextProp.selectedObj.tenVietTat
        })
      } else {
        this.setState({
          displayForm: nextProp.displayForm,
          TitleForm: nextProp.titleForm,
          action: nextProp.action,
          tenLinhVuc: '',
          maLinhVuc: '',
          tenVietTat: ''
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
      tenLinhVuc: '',
      maLinhVuc: '',
      tenVietTat: ''
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
            {/* Ten LinhVuc */}
            <Form.Item label="Tên lĩnh vực">
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Tên lĩnh vực"
                type="text"
                title="Tên lĩnh vực"
                name="tenLinhVuc"
                value={this.state.tenLinhVuc}
                required
                onChange={this.onHandleChange}
              />
            </Form.Item>

            {/* MoTa */}
            <Form.Item label="Tên Viết Tắt">
              <Input
                prefix={
                  <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Tên Viết Tắt"
                type="text"
                title="Tên Viết Tắt"
                name="tenVietTat"
                value={this.state.tenVietTat}
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

export default Form.create()(FormLinhVuc)
