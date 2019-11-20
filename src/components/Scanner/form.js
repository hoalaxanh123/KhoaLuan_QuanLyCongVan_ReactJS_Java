import React, { Component } from 'react'
import { Card, Input, Form, Icon, Button, Select } from 'antd'
const { Option } = Select

class FormCreateCongVan extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    //this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onCreate()
      } else alert('Cái địt')
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
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    return (
      <Card type="inner" style={{ marginTop: '5px' }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          {/* Số ký hiệu */}
          <Form.Item>
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
          <Form.Item>
            {getFieldDecorator('ngayBanHanh', {
              initialValue: today,
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
          <Form.Item>
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
          <Form.Item>
            {getFieldDecorator('mucDo', {
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
                type="text"
                placeholder="Mức độ"
                title="Mức độ"
              />
            )}
          </Form.Item>{' '}
          {/* Cơ quan ban hành */}
          <Form.Item>
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
          <Form.Item>
            {getFieldDecorator('ngayCoHieuLuc', {
              initialValue: today,
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
          <Form.Item>
            {getFieldDecorator('trichDan', {
              rules: [
                {
                  required: true,
                  message: 'Không được bỏ trống trường này !'
                }
              ]
            })(
              <Input
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
          <Form.Item>
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
          <Form.Item label="">
            {getFieldDecorator('linhVuc', {
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
          {/* loaiCongVan */}
          <Form.Item label="">
            {getFieldDecorator('loaiCongVan', {
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
              block
            >
              Lưu lại
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(FormCreateCongVan)
