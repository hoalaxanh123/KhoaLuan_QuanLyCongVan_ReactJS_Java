import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
// const { SubMenu } = Menu

const MyLink = ({ label, link, exactYES, icon }) => {
  return (
    <Route
      path={link}
      exact={exactYES}
      children={({ match }) => {
        // let active = match ? 'li_active' : ''
        return (
          //className={active}
          <Link
            to={{ pathname: link, state: { from: window.location.pathname } }}
          >
            <Icon type={icon} />
            <span>{label}</span>
          </Link>
        )
      }}
    />
  )
}

let menus = [
  {
    index: 1,
    label: 'Trang chủ',
    to: '/',
    exactYES: true,
    icon: 'home'
  },
  {
    index: 2,
    label: 'Số hoá công văn',
    to: '/so-hoa-cong-van',
    exactYES: false,
    icon: 'scan'
  },
  {
    index: 3,
    label: 'Ứng dụng mobile',
    to: '/mobile-application',
    exactYES: false,
    icon: 'mobile'
  },
  {
    index: 4,
    label: 'Trang quản trị',
    to: '/quan-tri',
    exactYES: false,
    icon: 'user'
  },
  {
    index: 5,
    label: 'Tài khoản',
    to: '/tai-khoan',
    exactYES: false,
    icon: 'user'
  }
]
class LeftMenu extends Component {
  showMenu = menus => {
    let result = []
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <Menu.Item key={menu.index}>
            <MyLink
              key={menu.index}
              label={menu.label}
              link={menu.to}
              exactYES={menu.exactYES}
              icon={menu.icon}
              className="menuItem"
            />
          </Menu.Item>
        )
      })
    }
    let loged = localStorage.getItem('loged')
    if (loged) {
      let index = result.findIndex(item => item.key === '6')
      result.splice(index, 1)
      result.push(
        <MyLink
          key={-1}
          label={'Đăng xuất'}
          link={'/logout'}
          exactYES={true}
          className="menuItem"
        />
      )
    }
    return result
  }
  state = {
    collapsed: false,
    position: 'block',
    collapsedWidth: '0'
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  componentDidMount() {
    if (window.innerWidth > 600) {
      this.setState({ position: 'block', collapsedWidth: '80' })
    } else {
      this.setState({ position: 'fixed', collapsedWidth: '0' })
    }
  }
  resize() {}
  render() {
    return (
      <Sider
        className="LeftMenu"
        collapsible
        style={{ position: this.state.position }}
        breakpoint="lg"
        collapsedWidth={this.state.collapsedWidth}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        >
        <div className="logo">
          <p>
            <b>PST</b> DLU
          </p>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {this.showMenu(menus)}
        </Menu>
      </Sider>
    )
  }
}
export default LeftMenu
