import React, { Component } from 'react'
import moment from 'moment'
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

const dateFormat = 'YYYY/MM/DD'
const monthFormat = 'YYYY/MM'
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

class FormFind extends Component {
  state = {
    expand: false,
    width: 6
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

  render() {
    const { getFieldDecorator } = this.props.form
    const config = {
      rules: [
        { type: 'object', required: true, message: 'Hãy chọn thời  gian!' }
      ]
    }
    return (
      <Card type="inner" title="Tìm kiếm" className="monition_height">
        <Form
          className="ant-advanced-search-form monition_height"
          onSubmit={this.handleSearch}
        >
          <Row>
            <Col
              span={24}
              style={{
                display: 'inline-flex'
              }}
            >
              <Select value="Tất cả" style={{ width: '30%' }}>
                <Option value="Anh ninh">RMB</Option>
                <Option value="Xã hội">Dollar</Option>
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
                })(<Input placeholder="Nhập thông tin cần tìm kiếm" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{ display: this.state.expand ? 'block' : 'none' }}
            className="monition_width"
          >
            <Col span={this.state.width}>
              <Form.Item label="Từ ngày">
                {getFieldDecorator('date-picker', config)(<DatePicker />)}
              </Form.Item>
            </Col>
            <Col span={this.state.width}>
              <Form.Item label="Tới ngày">
                {getFieldDecorator('date-picker', config)(<DatePicker />)}
              </Form.Item>
            </Col>

            <Col span={this.state.width}>
              <Form.Item label="Người ký">
                {getFieldDecorator(`field-${1}`, {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng không để trống!'
                    }
                  ]
                })(<Input placeholder="Nhập thông tin cần tìm kiếm" />)}
              </Form.Item>
            </Col>

            <Col span={this.state.width}>
              <Form.Item label="Gì đó">
                {getFieldDecorator(`field-${1}`, {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng không để trống!'
                    }
                  ]
                })(<Input placeholder="Nhập thông tin cần tìm kiếm" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
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
