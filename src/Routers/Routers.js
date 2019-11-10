import { Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import json_Routes from './routes'

class Routers extends Component {
  show_Route = Routes => {
    let result = []
    if (Routes) {
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
    }
    return result
  }
  render() {
    return <Switch>{this.show_Route(json_Routes)}</Switch>
  }
}

export default Routers
