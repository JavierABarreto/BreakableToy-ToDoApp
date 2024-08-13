import React from 'react'
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { Provider } from 'react-redux'
import { store } from '../redux/store.jsx'
import { App } from './App.jsx'

export const MainForTesting = () => {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  )
}
