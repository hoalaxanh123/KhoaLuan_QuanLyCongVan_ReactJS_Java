import React, { Component } from 'react'
import { Layout } from 'antd'
const { Footer } = Layout

class FooterComponent extends Component {
  render() {
    let year = new Date().getFullYear()
    return (
      <Footer style={{ textAlign: 'center' }}>
        Dalat University © {year}, Created by Faculty of Information Technology
      </Footer>
    )
  }
}
export default FooterComponent
