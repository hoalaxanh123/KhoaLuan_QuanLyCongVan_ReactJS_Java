import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <Row>
        <Col span={24} className="NotFound">
          <Card>
            <h1>404 Error</h1>
            <h2>The page you are looking for can't be found.</h2>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default NotFound
