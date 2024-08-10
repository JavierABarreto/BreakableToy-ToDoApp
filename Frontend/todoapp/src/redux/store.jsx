import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './slice'
import pageSliceReducer from './pageSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    page: pageSliceReducer,
  }
})

