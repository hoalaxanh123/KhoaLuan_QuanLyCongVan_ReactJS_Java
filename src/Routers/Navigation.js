// import NotFound from './../pages/NotFoundPage'
import React from 'react'
import ListCV from '../components/List'
import Scanner from '../components/Scanner'
import MobileApp from '../components/MobileApp'
import Admin from '../components/AdminPages'
import Logout from '../components/Logout'

const Navigation = [
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
    main: ({ history }) => <Admin history={history} />
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

export default Navigation
