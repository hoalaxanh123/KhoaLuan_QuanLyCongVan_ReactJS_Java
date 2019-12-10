import React, { Component } from 'react'
import { Card, Input, Form, Icon, Button, Select } from 'antd'
const { Option } = Select

class FormCreateCongVan extends Component {
  state = { trichDan: '', fileUploaded: [] }

  componentDidMount() {
    this.setState({
      trichDan: this.props.trichDan,
      fileUploaded: this.props.fileUploaded
    })
  }
  reSetForm() {
    this.setState({
      trichDan: '',
      fileUploaded: ''
    })
    this.props.form.setFieldsValue({
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
      maLoai: '',
      arrayKeys: []
    })
    this.props.reRestParent()
  }
  UNSAFE_componentWillReceiveProps(nextProp) {
    if (this.props !== nextProp) {
      console.log('nextProp.arrKeys :', nextProp.arrKeys)
      this.setState({
        trichDan: this.props.trichDan,
        arrayKeys: this.props.arrayKeys
      })
    }
  }
  getToDay = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    return today
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var save = window.confirm(
          'Hãy chắc chắn bạn đã nhập đúng mọi thông tin cần thiết'
        )
        if (save) {
          this.props.onCreate(values)
          console.log('values :', values)
        }
      } else alert('Hãy điền đầy đủ các trường cần thiết')
    })
  }
  render() {
    // Only show error after a field is touched.
    const { getFieldDecorator } = this.props.form

    let { loaiCV } = this.props

    let renderArrayLinhVuc = this.props.listLinhVuc.map((linhVuc, index) => (
      <Option value={linhVuc.maLinhVuc} key={index}>
        Lĩnh vực: {linhVuc.tenLinhVuc}
      </Option>
    ))
    let renderListLoaiCongVan = this.props.listLoaiCongVan.map(loaiCongVan => (
      <Option
        value={loaiCongVan.maLoai}
        title={loaiCongVan.moTa}
        key={loaiCongVan.maLoai}
      >
        Loại công văn: {loaiCongVan.tenLoai}
      </Option>
    ))

    let dateProp = this.props.date
    let { noiDung } = this.props
    let arr = noiDung.trim().split('\n')
    let timDong = {}
    let count = 1
    arr.forEach(line => {
      timDong[count] = line
      count = count + 1
    })
    timDong = JSON.stringify(timDong)
    let today = this.getToDay()
    return (
      <Card type="inner" style={{ marginTop: '5px' }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          {/* Arrkeys */}
          <Form.Item style={{ display: 'none' }}>
            {getFieldDecorator('keyword', {
              initialValue: this.props.arrKeys,
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
              initialValue: timDong,
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
          <Form.Item hasFeedback>
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
          <Form.Item hasFeedback>
            {getFieldDecorator('ngayBanHanh', {
              initialValue: dateProp ? dateProp : today,
              rules: [
                {
                  required: true,
                  message: 'Vui lòng chọn thời gian !'
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="date"
                placeholder="Ngày ban hành"
                title="Ngày ban hành"
              />
            )}
          </Form.Item>
          {/* Người ký */}
          <Form.Item hasFeedback>
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
          <Form.Item hasFeedback>
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
          <Form.Item hasFeedback>
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
          <Form.Item hasFeedback>
            {getFieldDecorator('ngayCoHieuLuc', {
              initialValue: dateProp ? dateProp : today,
              rules: [
                {
                  required: true,
                  message: 'Vui lòng chọn mốc thời gian !'
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="date"
                placeholder="Ngày có hiệu lực"
                title="Ngày có hiệu lực"
              />
            )}
          </Form.Item>{' '}
          {/* Trích dẫn */}
          <Form.Item hasFeedback>
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
          <Form.Item hasFeedback>
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
          <Form.Item>
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
              initialValue: this.props.fileUploaded
                .toString()
                .replace(/,/g, ', '),
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
          {/* Button  */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              icon="download"
            >
              Lưu lại
            </Button>

            <Button
              type="danger"
              className="login-form-button"
              icon="close-circle"
              onClick={() => this.reSetForm()}
              style={{ marginLeft: '5px' }}
            >
              Xoá trắng
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(FormCreateCongVan)
