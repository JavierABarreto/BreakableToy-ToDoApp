import React from 'react'
import * as bootstrap from 'bootstrap'

export const ToDoModal = () => {
  return (
    <div className="modal modal" id="todoModal" tabindex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h1 className="modal-title fs-5">Create new ToDo</h1>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <div className="mb-4">
              <p>Text</p>
              <textarea className="w-100" cols={10} maxLength={120} />
            </div>

            <div className="row mb-4">
              <div className="col-6">
                <p className="mb-2">Due date:</p>
                <input type="date" />
              </div>

              <div className="col-6">
                <p className="mb-2">Priority:</p>

                <select className="form-select">
                  <option selected>All, High, Medium, Low</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-success">Create ToDo</button>
          </div>
        </div>
      </div>
    </div>
  )
}
