import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    values: {
      todos: [],
      nPages: 0,
      currentPage: 1,
      avgPriorityAll: 0,
      priorities: {
        avgPriorityLow: 0,
        avgPriorityMedium: 0,
        avgPriorityHigh: 0
      }
    },
    todo: {}
  },
  reducers: {
    setTodosStore: (state, action) => {
      state.values = action.payload
    },
    setTodo: (state, action) => {
      state.todo = action.payload
    }
  }
})

export const { setTodosStore, setTodo } = todosSlice.actions
export default todosSlice.reducer