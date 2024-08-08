import React from 'react'
import { getTodosByFilters } from '../js/axios'
import { useDispatch } from 'react-redux'
import { setTodosStore } from '../redux/slice'

export const SearchFilter = () => {
  const dispatch = useDispatch()

  const search = async () => {
    const text = document.getElementById("inputTextSearchFilter").value
    const priority = document.getElementById("prioritySelectSearchFilter").value
    const status = document.getElementById("statusSelectSearchFilter").value

    const temp = await getTodosByFilters(text, priority, status)
    dispatch(setTodosStore(temp))
  }

  return (
    <div className="border w-75 mx-4 mt-4 p-4">
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
            <option selected value={0} disabled key={"v-d"}>All, High, Medium, Low</option>
            <option value={0} key={"v-0"}>All</option>
            <option value={3} key={"v-3"}>High</option>
            <option value={2} key={"v-2"}>Medium</option>
            <option value={1} key={"v-1"}>Low</option>
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
