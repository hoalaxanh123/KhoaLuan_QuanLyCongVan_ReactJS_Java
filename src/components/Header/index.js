import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import './index.css'
const { Header } = Layout
class HeaderComponent extends Component {
  render() {
    return (
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}></Col>
        <Header
          style={{
            background: '#fff',
            padding: '0',
            textAlign: 'center',
            fontSize: '20px'
          }}
        >
          <b>
            <img
              src={process.env.PUBLIC_URL + '/images/logo.gif'}
              style={{ maxWidth: '50px', float: 'right' }}
            />
            HỆ THỐNG SỐ HOÁ CÔNG VĂN
            <span className="medium"> - KHOA CÔNG NGHỆ THÔNG TIN</span>
          </b>
        </Header>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}></Col>
      </Row>
    )
  }
}
export default HeaderComponent
