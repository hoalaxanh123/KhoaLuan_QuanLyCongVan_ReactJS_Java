import { Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import json_Routes from './routes'
import Login from '../components/Login'

class Routers extends Component {
  show_Route = Routes => {
    let result = []
    if (Routes) {
      if (localStorage.getItem('userName')) {
        result = Routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exactYes}
              component={route.main}
            />
          )
        })
      } else {
        result.push(
          <Route
            key={-1}
            path={'/dang-nhap'}
            exact={true}
            component={({ location }) => <Login location={location} />}
          />
        )
      }
    }
    return result
  }
  render() {
    return <Switch>{this.show_Route(json_Routes)}</Switch>
  }
}

export default Routers
