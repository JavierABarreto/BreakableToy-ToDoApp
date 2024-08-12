import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    values: {
      todos: [],
      nPages: 0,
      currentPage: 1,
      avgPriorityAll: "",
      priorities: []
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