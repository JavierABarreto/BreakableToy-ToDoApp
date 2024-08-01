import React from 'react'

export const SearchFilter = () => {
  return (
    <div className="border w-75 mx-4 mt-4 p-4">
      <div className="row mb-2">
        <div className="col-1">
          <label for="inputText" className="col-form-label">Name</label>
        </div>
        <div className="col-11">
          <input type="text" id="inputText" className="form-control" placeholder="text" maxLength={120} />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-1">
          <label className="col-form-label">Priority</label>
        </div>
        <div className="col-4">
          <select className="form-select">
            <option selected>All, High, Medium, Low</option>
            <option value="All">One</option>
            <option value="High">One</option>
            <option value="Medium">Two</option>
            <option value="Low">Three</option>
          </select>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-1">
          <label className="col-form-label">Status</label>
        </div>
        <div className="col-4">
          <select className="form-select">
            <option selected>All, Done, Undone</option>
            <option value="1">All</option>
            <option value="2">Done</option>
            <option value="3">Undone</option>
          </select>
        </div>

        <div className="col-7 d-flex justify-content-end">
          <button className="btn btn-secondary px-5">Search</button>
        </div>
      </div>
    </div>
  )
}
