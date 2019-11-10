import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

const MyLink = ({ label, link, exactYES }) => {
  return (
    <Route
      path={link}
      exact={exactYES}
      children={({ match }) => {
        let active = match ? 'li_active' : ''
        return (
          <li className={active}>
            <Link
              to={{ pathname: link, state: { from: window.location.pathname } }}
              className="menuItem"
            >
              {label}
            </Link>
          </li>
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
    exactYES: true
  },
  {
    index: 4,
    label: 'Danh sách sản phẩm',
    to: '/products',
    exactYES: false
  },
  {
    index: 2,
    label: 'Giới thiệu',
    to: '/about',
    exactYES: false
  }
]

class Navigation extends Component {
  showMenu = menus => {
    let result = []
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <MyLink
            key={menu.index}
            label={menu.label}
            link={menu.to}
            exactYES={menu.exactYES}
            className="menuItem"
          />
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

  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-ex1-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand" href="s">
            <b>TMA</b> Solutions
          </Link>
        </div>

        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav">{this.showMenu(menus)}</ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="s" className="dropdown-toggle" data-toggle="dropdown">
                Hi, Vuong! <b className="caret"></b>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="s">Action</a>
                </li>
                <li>
                  <a href="s">Another action</a>
                </li>
                <li>
                  <a href="s">Something else here</a>
                </li>
                <li>
                  <a href="s">Separated link</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="s">Đăng xuất</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default Navigation
