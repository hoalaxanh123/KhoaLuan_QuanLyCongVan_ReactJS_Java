import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import CommonMethods from '../../constants/methods'
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
    icon: 'appstore'
  },
  {
    index: 5,
    label: 'Tài khoản',
    to: '/tai-khoan',
    exactYES: false,
    icon: 'user'
  }
]
function handleClick(e) {
  localStorage.setItem('menuKey', e.key)
}
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
      let logged = CommonMethods.CheckLoged()
      if (logged) {
        result.push(
          <Menu.Item key={6}>
            <MyLink
              key={100}
              label={'Đăng xuất'}
              link={'/dang-xuat'}
              exactYES={true}
              icon={'logout'}
              className="menuItem"
            />
          </Menu.Item>
        )
      } else {
        result.push(
          <Menu.Item key={6}>
            <MyLink
              key={100}
              label={'Đăng nhập'}
              link={'/dang-nhap'}
              exactYES={true}
              icon={'login'}
              className="menuItem"
            />
          </Menu.Item>
        )
      }
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
  UNSAFE_componentWillMount() {
    let menuKey = localStorage.getItem('menuKey')
    if (!menuKey) localStorage.setItem('menuKey', 1)
  }
  resize() {}
  render() {
    let menuKey = localStorage.getItem('menuKey')
    if (!menuKey) localStorage.setItem('menuKey', 1)
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
        <Menu
          theme="dark"
          defaultSelectedKeys={[menuKey ? menuKey : 1]}
          mode="inline"
          onClick={handleClick}
        >
          {this.showMenu(menus)}
        </Menu>
      </Sider>
    )
  }
}
export default LeftMenu
