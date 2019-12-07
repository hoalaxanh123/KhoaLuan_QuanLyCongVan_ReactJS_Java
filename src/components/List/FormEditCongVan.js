import React, { Component } from 'react'
import { Input, Form, Icon, Button, Select, Modal } from 'antd'
import { EDIT_LOAICONGVAN, ADD_LOAICONGVAN } from '../../constants/task'
const { Option } = Select
class FormEditCongVan extends Component {
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
    const { getFieldDecorator } = this.props.form
    let renderArrayLinhVuc = ''
    let renderListLoaiCongVan = ''
    let { loaiCV } = this.props

    try {
      renderArrayLinhVuc = this.props.listLinhVuc.map((linhVuc, index) => (
        <Option value={linhVuc.maLinhVuc} key={index}>
          Lĩnh vực: {linhVuc.tenLinhVuc}
        </Option>
      ))

      renderListLoaiCongVan = this.props.listLoaiCongVan.map(loaiCongVan => (
        <Option
          value={loaiCongVan.maLoai}
          title={loaiCongVan.moTa}
          key={loaiCongVan.maLoai}
        >
          Loại công văn: {loaiCongVan.tenLoai}
        </Option>
      ))
    } catch (error) {
      console.log('error :', error)
    }
    const formItemLayout = {
      labelCol: { span: 24 }
    }

    return (
      <div>
        <Modal
          width={'65%'}
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
          <h1>Sua Cong Van</h1>
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            {...formItemLayout}
          >
            {/* Noi Dung */}
            <Form.Item style={{ display: 'none' }}>
              {getFieldDecorator('noiDung', {
                initialValue: this.props.noiDung,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Nội dung"
                  type="text"
                  title="Nội dung"
                />
              )}
            </Form.Item>
            {/* Tim dong */}
            <Form.Item style={{ display: 'none' }}>
              {getFieldDecorator('timDong', {
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Tìm dòng"
                  type="text"
                  title="Tìm dòng"
                />
              )}
            </Form.Item>
            {/* id */}
            <Form.Item style={{ display: 'none' }}>
              {getFieldDecorator('id', {
                initialValue: -1,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Số ký hiệu"
                  type="text"
                  title="Số ký hiệu"
                />
              )}
            </Form.Item>
            {/* Số ký hiệu */}
            <Form.Item label="Số ký hiệu">
              {getFieldDecorator('soKyHieu', {
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Số ký hiệu"
                  type="text"
                  title="Số ký hiệu"
                />
              )}
            </Form.Item>
            {/* Ngày ban hành */}
            <Form.Item
              label="Ngày ban hành"
              labelAlign="left"
              labelWidth={2000}
            >
              {getFieldDecorator('ngayBanHanh', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng chọn thời gian !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="calendar"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  type="date"
                  placeholder="Ngày ban hành"
                  title="Ngày ban hành"
                />
              )}
            </Form.Item>
            {/* Người ký */}
            <Form.Item label="Người ký">
              {getFieldDecorator('nguoiKy', {
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="text"
                  placeholder="Người ký"
                  title="Người ký"
                />
              )}
            </Form.Item>
            {/* Mức độ */}
            <Form.Item label="Mức độ">
              {getFieldDecorator('mucDo', {
                initialValue: 0,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="number"
                  placeholder="Mức độ"
                  title="Mức độ"
                />
              )}
            </Form.Item>{' '}
            {/* Cơ quan ban hành */}
            <Form.Item label="Cơ quan b.hành">
              {getFieldDecorator('coQuanBanHanh', {
                initialValue: 'Trường Đại học Đà Lạt',
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="text"
                  placeholder="Cơ quan ban hành"
                  title="Cơ quan ban hành"
                />
              )}
            </Form.Item>{' '}
            {/* Ngày có hiệu lực */}
            <Form.Item label="Ngày có hiệu lực">
              {getFieldDecorator('ngayCoHieuLuc', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng chọn mốc thời gian !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="calendar"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  type="date"
                  placeholder="Ngày có hiệu lực"
                  title="Ngày có hiệu lực"
                />
              )}
            </Form.Item>{' '}
            {/* Trích dẫn */}
            <Form.Item label="Trích dẫn">
              {getFieldDecorator('trichYeu', {
                initialValue: this.props.trichDan,
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input.TextArea
                  rows={5}
                  prefix={
                    <Icon type="bold" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="text"
                  placeholder="Trích dẫn"
                  title="Trích dẫn"
                />
              )}
            </Form.Item>{' '}
            {/* Nơi nhận */}
            <Form.Item label="Nơi nhận">
              {getFieldDecorator('noiNhan', {
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="arrow-right"
                  placeholder="Nơi nhận"
                  title="Nơi nhận"
                />
              )}
            </Form.Item>{' '}
            {/* lĩnh vực */}
            <Form.Item label="Lĩnh vực">
              {getFieldDecorator('maLinhVuc', {
                initialValue: 1,
                rules: [{ required: true, message: 'Vui lòng chọn lĩnh vực' }]
              })(
                <Select
                  showSearch
                  placeholder="Chọn lĩnh vực"
                  optionFilterProp="children"
                  onChange={this.handleChangeLinhVuc}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {renderArrayLinhVuc}
                </Select>
              )}
            </Form.Item>
            {/* Tệp tin */}
            <Form.Item style={{ display: 'none' }}>
              {getFieldDecorator('tapTin', {
                rules: [
                  {
                    required: true,
                    message: 'Không được bỏ trống trường này !'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="arrow-right"
                  placeholder="Tệp tin"
                  title="Tệp tin"
                  readOnly
                />
              )}
            </Form.Item>
            {/* loaiCongVan */}
            <Form.Item>
              {getFieldDecorator('maLoai', {
                initialValue: loaiCV,
                rules: [
                  { required: true, message: 'Vui lòng chọn loại công văn' }
                ]
              })(
                <Select
                  showSearch
                  placeholder="Chọn loại công văn"
                  onChange={this.onChangeLoaiCongVan}
                >
                  {renderListLoaiCongVan}
                </Select>
              )}
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

export default Form.create()(FormEditCongVan)
