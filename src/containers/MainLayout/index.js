import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as taskAction from './../../actions/task'
import 'antd/dist/antd.css'

import { Layout } from 'antd'
import HeaderComponent from '../../components/Header'
import LeftMenu from '../../components/LeftMenu'
import FooterComponent from '../../components/Footer/Footer'
import Routers from './../../Routers/Routers'
import { BrowserRouter as Router } from 'react-router-dom'
const { Content } = Layout
class MainLayout extends Component {
  UNSAFE_componentWillMount() {
    document.title = 'DLU | Số hóa công văn'
  }
  render() {
    return (
      <Router>
        <Layout>
          <LeftMenu />
          <Layout>
            <HeaderComponent />
            <Content
              style={{
                margin: '24px 16px 0',
                overflow: 'initial',
                minHeight: `${window.screen.height - 200}px`
              }}
            >
              <Routers />
            </Content>
            <FooterComponent />
          </Layout>
        </Layout>
      </Router>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // taskActionCreator: bindActionCreators(taskAction, dispatch)
  }
}
const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout)
