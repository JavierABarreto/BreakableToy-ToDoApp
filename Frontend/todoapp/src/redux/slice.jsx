import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    value: []
  },
  reducers: {
    greeting: state => {
      alert("Hello world!")
    }
  }
})

export const { greeting } = todosSlice.actions
export default todosSlice.reducer