import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.router.jsx'
import { store } from './redux/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
)
