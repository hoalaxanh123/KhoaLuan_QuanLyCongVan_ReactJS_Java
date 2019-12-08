import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import './index.css'

class NotAllow extends Component {
  render() {
    return (
      <Row>
        <Col span={24} className="NotFound">
          <Card>
            <h1>403 Forbidden</h1>
            <h2>
              Trang này chỉ dành cho quản trị viên, vui lòng đăng nhập dưới
              quyền quản trị viên để sử dụng !
            </h2>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default NotAllow
