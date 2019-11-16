import React, { Component } from 'react'
import * as constant from './../../constants/index'
import {
  Card,
  Row,
  Col,
  Input,
  Form,
  Icon,
  Button,
  Upload,
  message
} from 'antd'
const { TextArea } = Input

const props = {
  action: constant.API_URL_UPFILE,
  multiple: true,
  defaultFileList: []
}
class Scanner extends Component {
  state = {
    fileList: [],
    contentReading: ''
  }

  handleChange = info => {
    let fileList = [...info.fileList]
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // fileList = fileList.slice(-2)

    // 2. Read from response and show file link
    let content = ''
    fileList.forEach(file => {
      if (file.response) {
        // Component will show file.url as link
        console.log('file.response :', file.response.content)
        content = content + '\n' + file.response.content
      }
    })

    this.setState({ fileList, contentReading: content })

    // handleChange= (info) => {
    //   info.fileList.filter(file => file.type !== "image/jpeg")
    //   .map((file, idx) => info.fileList.splice(idx, 1));
    //   ....
    //   }
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    //this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  render() {
    // Only show error after a field is touched.
    const { getFieldDecorator } = this.props.form

    return (
      <Card
        type="inner"
        title="Số hoá công văn"
        className="Scanner_Card_Parent"
      >
        <Row>
          {/* Scanner */}
          <Col span={24}>
            <Card type="inner">
              <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <Form.Item label="Hình ảnh:">
                  <Upload
                    {...props}
                    accept="image/*"
                    onChange={this.handleChange}
                  >
                    <Button block>
                      <Icon type="upload" /> Chọn hình ảnh để tiến hành xử lý
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={false}
                    block
                    icon="search"
                  >
                    Scan
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Result */}
          <Col span={12}>
            <Card type="inner" style={{ marginTop: '5px', maxWidth: '99%' }}>
              <label>Kết quả:</label>
              <TextArea
                rows={32}
                value={this.state.contentReading}
                onChange={this.onChange}
                placeholder="Controlled autosize"
              />
            </Card>
          </Col>

          {/* Form */}
          <Col span={12}>
            <Card type="inner" style={{ marginTop: '5px' }}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                {/* Số ký hiệu */}
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="number"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Số ký hiệu"
                    />
                  )}
                </Form.Item>
                {/* Ngày ban hành */}
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
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
                      type="password"
                      placeholder="Ngày ban hành"
                    />
                  )}
                </Form.Item>
                {/* Người ký */}
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Người ký"
                    />
                  )}
                </Form.Item>
                {/* Mức độ */}
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="number"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Mức độ"
                    />
                  )}
                </Form.Item>{' '}
                {/* Cơ quan ban hành */}
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="bank"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Cơ quan ban hành"
                    />
                  )}
                </Form.Item>{' '}
                {/* Ngày có hiệu lực */}
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
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
                      type="password"
                      placeholder="Ngày có hiệu lực"
                    />
                  )}
                </Form.Item>{' '}
                {/* Trích dẫn */}
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="bold"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Trích dẫn"
                    />
                  )}
                </Form.Item>{' '}
                {/* Nơi nhận */}
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="arrow-right"
                      placeholder="Nơi nhận"
                    />
                  )}
                </Form.Item>{' '}
                {/* Loại công văn */}
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="menu-unfold"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Loại công văn"
                    />
                  )}
                </Form.Item>
                {/* Lĩnh vực */}
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Không được bỏ trống trường này !'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="radar-chart"
                      placeholder="Lĩnh vực"
                    />
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
                    htmlType="button"
                    style={{ marginLeft: '5px' }}
                    icon="close-circle"
                  >
                    Xoá hết
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Card>
    )
  }
}
export default Form.create()(Scanner)
