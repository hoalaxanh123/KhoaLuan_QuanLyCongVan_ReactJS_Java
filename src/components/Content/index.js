import React, { Component } from 'react'
import { Layout } from 'antd'
import FormFind from '../FormFind'
import ListCV from '../List'
import Scanner from '../Scanner'
const { Content } = Layout

class ContentConponent extends Component {
  render() {
    return (
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        {/* <FormFind /> */}
        {/* <ListCV /> */}
        <Scanner />
      </Content>
    )
  }
}
export default ContentConponent
