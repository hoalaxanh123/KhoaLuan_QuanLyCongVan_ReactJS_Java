import React, { Component } from 'react'
import { Layout } from 'antd'
import FormFind from '../FormFind'
import ListCV from '../List'
import Scanner from '../Scanner'
import MobileApp from '../MobileApp'
import Admin from '../AdminPages'
const { Content } = Layout

class ContentConponent extends Component {
  render() {
    return (
      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
          minHeight: '770px'
        }}
      >
        {/* <FormFind /> */}
        {/* <ListCV /> */}
        {/* <MobileApp /> */}
        <Admin />
      </Content>
    )
  }
}
export default ContentConponent
