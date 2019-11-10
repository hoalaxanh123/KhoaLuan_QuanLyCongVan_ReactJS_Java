import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as taskAction from './../../actions/task'
import 'antd/dist/antd.css'

import { Layout } from 'antd'
import HeaderComponent from '../../components/Header'
import LeftMenu from '../../components/LeftMenu'
import FooterComponent from '../../components/Footer/Footer'
import ContentConponent from '../../components/Content'
import Routers from './../../Routers/Routers'
import { BrowserRouter as Router } from 'react-router-dom'

class MainLayout extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <LeftMenu />
          <Layout>
            <HeaderComponent />
            <ContentConponent />
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
