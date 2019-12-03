import NotFound from '../components/NotFound'
import React from 'react'
import ListCV from '../components/List'
import Scanner from '../components/Scanner'
import MobileApp from '../components/MobileApp'
import Admin from '../components/AdminPages'
import Login from '../components/Login'
import TaiKhoan from '../components/TaiKhoan'
import Logout from '../components/Logout'

const json_Routes = [
  {
    path: '/',
    exactYes: true,
    main: ({ location }) => <ListCV location={location} />
  },
  {
    path: '/so-hoa-cong-van',
    exactYes: true,
    main: ({ history }) => <Scanner history={history} />
  },
  {
    path: '/mobile-application',
    exactYes: true,
    main: ({ history }) => <MobileApp history={history} />
  },
  {
    path: '/quan-tri',
    exactYes: true,
    main: ({ history }) => <Admin history={history} />
  },
  {
    path: '/tai-khoan',
    exactYes: true,
    main: ({ history }) => <TaiKhoan history={history} />
  },
  {
    path: '/dang-nhap',
    exactYes: true,
    main: ({ location }) => <Login location={location} />
  },
  {
    path: '/dang-xuat',
    exactYes: true,
    main: ({ history }) => <Logout />
  },
  {
    path: '',
    exactYes: true,
    main: ({ location }) => <NotFound location={location} />
  }
]

export default json_Routes
