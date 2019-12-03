import React, { Component } from 'react'
import { API_AFTER_LOGIN, API_PAGE_LOGIN } from '../../constants'
import Message from '../../method/Message'
import CommonMethods from '../../constants/methods'

class Logout extends Component {
  UNSAFE_componentWillMount() {
    CommonMethods.LogOut()
  }
  render() {
    return <div></div>
  }
}
export default Logout
