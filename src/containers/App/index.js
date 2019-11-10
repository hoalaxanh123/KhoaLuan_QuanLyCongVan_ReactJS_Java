import React, { Component } from 'react'
import MainLayout from '../MainLayout'
import { Provider } from 'react-redux'
import configureStore from './../../redux/configStore'
import { Spinner } from './../../components/Spinner'

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainLayout />
        <Spinner />
      </Provider>
    )
  }
}
export default App
