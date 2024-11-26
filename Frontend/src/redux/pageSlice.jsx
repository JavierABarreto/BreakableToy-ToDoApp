import { createSlice } from '@reduxjs/toolkit'

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    flag: true,
    filters: {
      order: "dsc",
      getByPriority: "default",
      getByStatus: 0,
      sortByDone: "default",
      sortByUndone: "default",
      sortByPriority: "default",
      sortByDate: "default",
      text: "",
      min: 1,
      max: 10,
    }
  },
  reducers: {
    setFlag: (state) => {
      state.flag = !state.flag
    },
    setFilter: (state, action) => {
      switch (action.payload.type) {
        case "getByPriority":
          state.filters.getByPriority = action.payload.payload
          break;

        case "getByStatus":
          state.filters.getByStatus = Number(action.payload.payload)
          break;

        case "sortByDone":
          state.filters.sortByDone = action.payload.payload
          break;

        case "sortByUndone":
          state.filters.sortByUndone = action.payload.payload
          break;

        case "pagination":
          const { min, max } = action.payload.payload
          state.filters.max = max
          state.filters.min = min
          break;

        case "sortByPriority":
          state.filters.sortByPriority = action.payload.payload
          break;

        case "sortByDate":
          state.filters.sortByDate = action.payload.payload
          break;

        case "text":
          state.filters.text = action.payload.payload
          break;

        case "min":
          state.filters.min = action.payload.payload
          break;
          
        case "max":
          state.filters.max = action.payload.payload
          break;

        default:
          break;
      }
    }
  }
})

export const { setFlag, setFilter } = pageSlice.actions
export default pageSlice.reducer