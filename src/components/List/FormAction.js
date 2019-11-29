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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }
  resetForm = () => {
    this.setState({
      tenLoai: '',
      moTa: '',
      maLoai: ''
    })
    this.props.form.setFieldsValue({
      tenLoai: '',
      moTa: '',
      maLoai: ''
    })
  }
  UNSAFE_componentWillMount() {
    this.resetForm()
  }
  render() {
    // Only show error after a field is touched.
    const { getFieldDecorator } = this.props.form

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
            </Button>,
            <Button key="x" onClick={() => console.log(this.state)}>
              state
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            {/* Action */}
            <Form.Item style={{ display: 'none' }}>
              {getFieldDecorator('action', {
                initialValue: this.state.action,
                rules: [{}]
              })(<Input type="text" />)}
            </Form.Item>

            {/* Ma Loai */}
            <Form.Item style={{ display: 'none' }}>
              {getFieldDecorator('maLoai', {
                initialValue: this.state.maLoai.toString(),
                rules: [{}]
              })(<Input type="number" />)}
            </Form.Item>

            {/* TenLoai */}
            <Form.Item label="Tên loại">
              {getFieldDecorator('tenLoai', {
                initialValue: this.state.tenLoai,
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
                  placeholder="Tên loại"
                  type="text"
                  title="Tên loại"
                />
              )}
            </Form.Item>

            {/* MoTa */}
            <Form.Item label="Mô tả">
              {getFieldDecorator('moTa', {
                initialValue: this.state.moTa,
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
                  placeholder="Mô tả"
                  type="text"
                  title="Mô tả"
                />
              )}
            </Form.Item>
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
