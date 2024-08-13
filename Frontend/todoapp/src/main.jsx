import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import { App } from './pages/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <App />
  </Provider>
)