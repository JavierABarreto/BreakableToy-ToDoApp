import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [],
    todo: {}
  },
  reducers: {
    setTodosStore: (state, action) => {
      state.value = action.payload
    },
    setTodo: (state, action) => {
      state.todo = action.payload
    }
  }
})

export const { setTodosStore, setTodo } = todosSlice.actions
export default todosSlice.reducer