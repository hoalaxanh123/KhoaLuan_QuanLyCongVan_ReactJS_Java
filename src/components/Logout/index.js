import React, { Component } from 'react'
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
