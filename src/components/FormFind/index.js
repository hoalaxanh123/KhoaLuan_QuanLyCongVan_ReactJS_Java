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
import moment from 'moment'
const { Option } = Select
const { RangePicker } = DatePicker

//const dateFormat = 'DD/MM/YYYY'
// const monthFormat = 'YYYY/MM'
// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

class FormFind extends Component {
  state = {
    expand: true,
    width: 6,
    disabled: false,
    keyword: '',
    loaiCongVan: -1,
    linhVuc: -4,
    ngayBatDau: null,
    ngayKetThuc: null,
    nguoiKy: -2,
    coQuanBanHanh: -3
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
  handleSearch = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('this.state :', this.state)
  }
  onChangeLoaiCongVan = event => {
    this.setState({ loaiCongVan: event })
  }
  handleChangeKeyWord = event => {
    this.setState({
      keyword: event.target.value
    })
  }
  handleChangeNguoiKy = event => {
    this.setState({
      nguoiKy: event
    })
  }
  handleChangeBanHanh = event => {
    this.setState({
      coQuanBanHanh: event
    })
  }
  onOKhandle = () => {
    console.log('this.state :', this.state)
  }
  handleTrongKhoang = event => {
    if (event.length !== 0) {
      this.setState({
        ngayBatDau: event[0].format('L'),
        ngayKetThuc: event[1].format('L')
      })
    }
  }
  handleChangeLinhVuc = event => {
    if (event.length !== 0) {
      this.setState({
        linhVuc: event
      })
    }
  }
  render() {
    let listCV = this.props.listCV

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
    let renderArrayLinhVuc = this.props.listLinhVuc.map((linhVuc, index) => (
      <Option value={linhVuc.maLinhVuc} key={index}>
        {linhVuc.tenLinhVuc}
      </Option>
    ))
    let date = new Date()
    let dateStart = date.toLocaleDateString('vi-vn')
    let dateEnd = date.toLocaleDateString('vi-vn')
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
                value={this.state.loaiCongVan}
                style={{ width: '30%', opacity: 1 }}
                onChange={this.onChangeLoaiCongVan}
                name="linhVuc"
              >
                <Option value={-1} title={'Tất cả các loại'} key={-1}>
                  Tất cả các loại
                </Option>
                {renderListLoaiCongVan}
              </Select>
              <Form.Item
                label=""
                style={{ width: '80%', marginLeft: '3%', marginTop: '-5px' }}
              >
                <Input
                  placeholder="Nhập thông tin cần tìm kiếm"
                  onChange={this.handleChangeKeyWord}
                  value={this.state.keyword}
                />
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
              <Form.Item label="" {...formItemLayout}>
                <RangePicker
                  allowClear
                  defaultValue={[moment({ dateStart }), moment({ dateEnd })]}
                  format="DD-MM-YYYY"
                  placeholder={['Từ ngày', 'Tới ngày']}
                  onChange={this.handleTrongKhoang}
                />
              </Form.Item>
            </Col>

            <Col span={this.state.width}>
              <Form.Item label="Người ký">
                <Select
                  showSearch
                  style={{ width: 250 }}
                  placeholder="Chọn người ký"
                  optionFilterProp="children"
                  defaultValue={-2}
                  value={this.state.nguoiKy}
                  onChange={this.handleChangeNguoiKy}
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

            <Col span={this.state.width}>
              <Form.Item label="Ban hành">
                <Select
                  showSearch
                  style={{ width: 250 }}
                  value={this.state.coQuanBanHanh}
                  placeholder="Chọn cơ quan ban hành"
                  optionFilterProp="children"
                  defaultValue={-3}
                  onChange={this.handleChangeLinhVuc}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={-3} title={'Tất cả'} key={-3}>
                    Tất cả cơ quan
                  </Option>
                  {renderArrayCoQuanBanHanh}
                </Select>
              </Form.Item>
            </Col>

            <Col span={this.state.width - 1}>
              <Form.Item label="Lĩnh vực">
                <Select
                  showSearch
                  style={{ width: 250 }}
                  value={this.state.linhVuc}
                  placeholder="Chọn lĩnh vực"
                  optionFilterProp="children"
                  defaultValue={-4}
                  onChange={this.handleChangeBanHanh}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={-4} title={'Tất cả'} key={-3}>
                    Tất cả lĩnh vực
                  </Option>
                  {renderArrayLinhVuc}
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
