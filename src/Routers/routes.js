import NotFound from '../components/NotFound'
import React from 'react'
import ListCV from '../components/List'
import Scanner from '../components/Scanner'
import MobileApp from '../components/MobileApp'
import Admin from '../components/AdminPages'
import Login from '../components/Login'
import TaiKhoan from '../components/TaiKhoan'
import Logout from '../components/Logout'
import CommonMethods from '../constants/methods'

const json_Routes = [
  {
    key: 1,
    path: '/',
    exactYes: true,
    main: ({ location }) =>
      CommonMethods.CheckLoged() ? <ListCV location={location} /> : <Login />
  },
  {
    key: 2,
    path: '/so-hoa-cong-van',
    exactYes: true,
    main: ({ history }) =>
      CommonMethods.CheckLoged() ? <Scanner history={history} /> : <Login />
  },
  {
    key: 3,
    path: '/mobile-application',
    exactYes: true,
    main: ({ history }) => <MobileApp history={history} />
  },
  {
    key: 4,
    path: '/quan-tri',
    exactYes: true,
    main: ({ history }) =>
      CommonMethods.CheckLoged() ? <Admin history={history} /> : <Login />
  },
  {
    key: 5,
    path: '/tai-khoan',
    exactYes: true,
    main: ({ history }) =>
      CommonMethods.CheckLoged() ? <TaiKhoan history={history} /> : <Login />
  },
  {
    key: 6,
    path: '/dang-nhap',
    exactYes: true,
    main: ({ location }) => <Login location={location} />
  },
  {
    key: 7,
    path: '/dang-xuat',
    exactYes: true,
    main: ({ history }) => (CommonMethods.CheckLoged() ? <Logout /> : <Login />)
  },
  {
    key: 8,
    path: '',
    exactYes: true,
    main: ({ location }) => <NotFound location={location} />
  }
]

export default json_Routes
