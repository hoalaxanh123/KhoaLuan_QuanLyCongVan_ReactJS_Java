import React, { Component } from 'react'
// import moment from 'moment'
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  DatePicker,
  Select
} from 'antd'
const { Option } = Select
const { RangePicker } = DatePicker

// const dateFormat = 'YYYY/MM/DD'
// const monthFormat = 'YYYY/MM'
// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

class FormFind extends Component {
  state = {
    expand: true,
    width: 6,
    disabled: false
  }

  // To generate mock Form.Item

  handleSearch = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }

  componentDidMount() {
    if (window.innerWidth > 600) {
      this.setState({ width: 6 })
    } else {
      this.setState({ width: 24 })
    }
  }
  process = listCV => {
    let arrayNguoiKy = []
    let arrayCoQuanBanHanh = []
    for (let congVan of listCV) {
      if (arrayNguoiKy.indexOf(congVan.nguoiKy) === -1) {
        arrayNguoiKy.push(congVan.nguoiKy)
      }
      if (arrayCoQuanBanHanh.indexOf(congVan.coQuanBanHanh) === -1) {
        arrayCoQuanBanHanh.push(congVan.coQuanBanHanh)
      }
    }
    return {
      arrayNguoiKy: arrayNguoiKy,
      arrayCoQuanBanHanh: arrayCoQuanBanHanh
    }
  }
  handleSearch = e => {
    e.preventDefault()
    console.log('e :', e)
    // this.props.handleSearch()
  }
  handleChange = e => {
    console.log('e :', e)
  }
  render() {
    let listCV = this.props.listCV
    const { getFieldDecorator } = this.props.form

    let { listLoaiCongVan } = this.props
    let renderListLoaiCongVan = listLoaiCongVan.map(loaiCongVan => (
      <Option
        value={loaiCongVan.maLoai}
        title={loaiCongVan.moTa}
        key={loaiCongVan.maLoai}
      >
        {loaiCongVan.tenLoai}
      </Option>
    ))
    let formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 12 }
    }
    let result = this.process(listCV)
    let arrayNguoiKy = result.arrayNguoiKy
    let arrayCoQuanBanHanh = result.arrayCoQuanBanHanh

    let renderArrayNguoiKy = arrayNguoiKy.map((nguoiKy, index) => (
      <Option value={nguoiKy} key={index}>
        {nguoiKy}
      </Option>
    ))

    let renderArrayCoQuanBanHanh = arrayCoQuanBanHanh.map(
      (coQuanBanHanh, index) => (
        <Option value={coQuanBanHanh} key={index}>
          {coQuanBanHanh}
        </Option>
      )
    )

    return (
      <Card type="inner" title="Tìm kiếm">
        <Form
          className="ant-advanced-search-form "
          onSubmit={this.handleSearch}
        >
          <Row>
            <Col
              span={24}
              style={{
                display: 'inline-flex'
              }}
            >
              <Select
                showSearch
                value={-1}
                style={{ width: '30%', opacity: 1 }}
              >
                <Option value={-1} title={'Tất cả lĩnh vực'} key={-1}>
                  Tất cả lĩnh vực
                </Option>
                {renderListLoaiCongVan}
              </Select>
              <Form.Item
                label=""
                style={{ width: '80%', marginLeft: '3%', marginTop: '-5px' }}
              >
                {getFieldDecorator(`field-${1}`, {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng không để trống!'
                    }
                  ]
                })(
                  <Input
                    placeholder="Nhập thông tin cần tìm kiếm"
                    onChange={this.handleChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{ display: this.state.expand ? 'block' : 'none' }}
            className="monition_width"
          >
            <Col
              span={
                this.state.width < 24 ? this.state.width + 1 : this.state.width
              }
            >
              <Form.Item label="Trong khoảng" {...formItemLayout}>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['Start Time', 'End Time']}
                />
              </Form.Item>
            </Col>

            <Col span={this.state.width}>
              <Form.Item label="Người ký">
                <Select
                  showSearch
                  style={{ width: 250 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  defaultValue={-2}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={-2} title={'Tất cả'} key={-2}>
                    Tất cả
                  </Option>
                  {renderArrayNguoiKy}
                </Select>
              </Form.Item>
            </Col>

            <Col span={this.state.width + 1}>
              <Form.Item label="Ban hành">
                <Select
                  showSearch
                  style={{ width: 250 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  defaultValue={-3}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={-3} title={'Tất cả'} key={-3}>
                    Tất cả
                  </Option>
                  {renderArrayCoQuanBanHanh}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.state.disabled}
              >
                Tìm kiếm
              </Button>
              <Button
                style={{ marginLeft: 8, fontSize: 12 }}
                onClick={this.toggle}
              >
                Nâng cao <Icon type={this.state.expand ? 'up' : 'down'} />
              </Button>
              <Col span={24} style={{ textAlign: 'right' }} />
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(FormFind)
