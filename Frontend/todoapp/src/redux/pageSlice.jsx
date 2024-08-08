import { createSlice } from '@reduxjs/toolkit'

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    flag: true,
    type: "create"
  },
  reducers: {
    setFlag: (state) => {
      state.flag = !state.flag
    },
    setTypeModal: (state, action) => {
      state.type = action.payload
    }
  }
})

export const { setFlag, setModalData, setTypeModal } = pageSlice.actions
export default pageSlice.reducer