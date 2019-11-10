import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
const { SubMenu } = Menu

class LeftMenu extends Component {
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
  resize() {
    console.log('Yeah :', 'Yeah')
  }
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
          <Menu.Item key="1">
            <Icon type="home" />
            <span>Trang chủ</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="scan" />
            <span>Số hoá công văn</span>
          </Menu.Item>

          <Menu.Item>
            <Icon type="mobile" />
            <span>Ứng dụng mobile</span>
          </Menu.Item>
          <Menu.Item>
            <Icon type="control" />
            <span>Trang quản trị</span>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>Tài khoản</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <i className="fas fa-user-edit"></i> &nbsp; Thông tin
            </Menu.Item>
            <Menu.Item key="4">
              <i class="fas fa-user-cog"></i> &nbsp; Đổi mật khẩu
            </Menu.Item>
            <Menu.Item key="5">
              <i class="fas fa-sign-out-alt"></i> &nbsp; Đăng xuất
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}
export default LeftMenu
