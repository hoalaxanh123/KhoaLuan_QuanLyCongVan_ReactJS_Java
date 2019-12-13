import React, { Component } from 'react'
import { Input, Form, Icon, Button, Select, Modal } from 'antd'
import { ADD_LOAICONGVAN, EDIT_TASK } from '../../constants/task'
const { Option } = Select
class FormEditCongVan extends Component {
  state = {
    visible: false,
    TitleForm: '',
    action: ADD_LOAICONGVAN,
    noiDung: '',
    ID: '',
    soKyHieu: '',
    ngayBanHanh: '',
    nguoiKy: '',
    mucDo: '',
    coQuanBanHanh: '',
    ngayCoHieuLuc: '',
    trichYeu: '',
    noiNhan: '',
    maLinhVuc: '',
    tapTin: '',
    maLoai: ''
  }
  getToDay = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    return today
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
      if (nextProp.action === EDIT_TASK) {
        console.log('nextProp :', nextProp)
        this.setState({
          displayForm: nextProp.displayForm,
          TitleForm: nextProp.titleForm,
          action: nextProp.action,
          noiDung: nextProp.selectedObj.noiDung,
          id: nextProp.selectedObj.id,
          timDong: nextProp.selectedObj.timDong,
          soKyHieu: nextProp.selectedObj.soKyHieu,
          ngayBanHanh: nextProp.selectedObj.ngayBanHanh,
          nguoiKy: nextProp.selectedObj.nguoiKy,
          mucDo: nextProp.selectedObj.mucDo,
          coQuanBanHanh: nextProp.selectedObj.coQuanBanHanh,
          ngayCoHieuLuc: nextProp.selectedObj.ngayCoHieuLuc,
          trichYeu: nextProp.selectedObj.trichYeu,
          noiNhan: nextProp.selectedObj.noiNhan,
          maLinhVuc: nextProp.selectedObj.maLinhVuc,
          tapTin: nextProp.selectedObj.tapTin,
          maLoai: nextProp.selectedObj.maLoai
        })
      } else {
        this.setState({
          displayForm: nextProp.displayForm,
          TitleForm: nextProp.titleForm,
          action: nextProp.action,
          noiDung: '',
          id: '',
          timDong: '',
          soKyHieu: '',
          ngayBanHanh: this.getToDay(),
          nguoiKy: '',
          mucDo: '',
          coQuanBanHanh: '',
          ngayCoHieuLuc: this.getToDay(),
          trichYeu: '',
          noiNhan: '',
          maLinhVuc: '',
          tapTin: '',
          maLoai: ''
        })
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.state.onSubmit(this.state)
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

  render() {
    const { getFieldDecorator } = this.props.form
    let renderArrayLinhVuc = ''
    let renderListLoaiCongVan = ''

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
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            {...formItemLayout}
          >
            {/* Noi Dung */}
            <Form.Item style={{ display: 'none' }}>
              {getFieldDecorator('noiDung', {
                initialValue: this.state.noiDung,
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
            <Form.Item label="Số ký hiệu" hasFeedback>
              {getFieldDecorator('soKyHieu', {
                initialValue: this.state.soKyHieu,
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
            <Form.Item label="Ngày ban hành" labelAlign="left" lhasFeedback>
              {getFieldDecorator('ngayBanHanh', {
                initialValue: this.state.ngayBanHanh,
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
            <Form.Item label="Người ký" hasFeedback>
              {getFieldDecorator('nguoiKy', {
                initialValue: this.state.nguoiKy,
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
            <Form.Item label="Mức độ" hasFeedback>
              {getFieldDecorator('mucDo', {
                initialValue: this.state.mucDo,
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
            <Form.Item label="Cơ quan b.hành" hasFeedback>
              {getFieldDecorator('coQuanBanHanh', {
                initialValue: this.state.coQuanBanHanh,
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
            <Form.Item label="Ngày có hiệu lực" hasFeedback>
              {getFieldDecorator('ngayCoHieuLuc', {
                initialValue: this.state.ngayCoHieuLuc,
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
            <Form.Item label="Trích dẫn" hasFeedback>
              {getFieldDecorator('trichYeu', {
                initialValue: this.state.trichYeu,
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
            <Form.Item label="Nơi nhận" hasFeedback>
              {getFieldDecorator('noiNhan', {
                initialValue: this.state.noiNhan,
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
            <Form.Item label="Lĩnh vực" hasFeedback>
              {getFieldDecorator('maLinhVuc', {
                initialValue: this.state.maLinhVuc,
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
                initialValue: this.state.tapTin,
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
                initialValue: this.state.maLoai,
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
