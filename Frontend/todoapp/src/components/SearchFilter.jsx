import React from 'react'
import { getTodos } from '../js/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTodosStore } from '../redux/slice'
import { setFilter } from '../redux/pageSlice'

export const SearchFilter = () => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.page.filters)

  const search = async () => {
    const text = document.getElementById("inputTextSearchFilter").value
    const priority = document.getElementById("prioritySelectSearchFilter").value
    const status = document.getElementById("statusSelectSearchFilter").value

    dispatch(setFilter({ payload: text, type: "text" }))
    priority != "default" ? dispatch(setFilter({ payload: priority, type: "getByPriority" })) : dispatch(setFilter({ payload: "default", type: "getByPriority" })) 
    status != 0 ? dispatch(setFilter({ payload: status, type: "getByStatus" })) : dispatch(setFilter({ payload: 0, type: "getByStatus" }))

    const temp = await getTodos(filters)
    dispatch(setTodosStore(temp))
  }

  return (
    <div className="border mx-4 mt-4 p-4">
      <div className="row mb-2">
        <div className="col-1">
          <label htmlFor="inputText" className="col-form-label">Name</label>
        </div>
        <div className="col-11">
          <input type="text" id="inputTextSearchFilter" className="form-control" placeholder="text" maxLength={120} />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-1">
          <label className="col-form-label">Priority</label>
        </div>
        <div className="col-4">
          <select className="form-select" id="prioritySelectSearchFilter">
            <option selected value={"default"} disabled key={"v-d"}>All, High, Medium, Low</option>
            <option value={"default"} key={"v-0"}>All</option>
            <option value={"High"} key={"v-3"}>High</option>
            <option value={"Medium"} key={"v-2"}>Medium</option>
            <option value={"Low"} key={"v-1"}>Low</option>
          </select>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-1">
          <label className="col-form-label">Status</label>
        </div>
        <div className="col-4">
          <select className="form-select" id="statusSelectSearchFilter">
            <option selected value={0} disabled>All, Done, Undone</option>
            <option value={0}>All</option>
            <option value={1}>Done</option>
            <option value={2}>Undone</option>
          </select>
        </div>

        <div className="col-7 d-flex justify-content-end">
          <button className="btn btn-secondary px-5" onClick={() => search()}>Search</button>
        </div>
      </div>
    </div>
  )
}
