import React, { useEffect } from 'react'
import * as bootstrap from 'bootstrap'
import moment from 'moment'
import { createNewTodo, editTodoRequest } from '../js/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFlag } from '../redux/pageSlice'

export const ToDoModal = ({ clearFields, type }) => {
  const dispatch = useDispatch();
  const flag = useSelector(state => state.page.flag)
  const todo = useSelector(state => state.todos.todo)

  if(type == "edit") {
    const { dueDate, priority, text } = todo
    let formatedDueDate = dueDate == 0 ? "" : moment.unix(todo.dueDate).format("YYYYY-MM-DDTHH:mm")

    document.getElementById("inputText").value = text
    document.getElementById("inputDueDate").value = formatedDueDate
    document.getElementById("prioritySelect").value = priority
  }

  const saveTodo = () => {
    const text = document.getElementById("inputText").value
    const dueDate = document.getElementById("inputDueDate").value
    const priority = document.getElementById("prioritySelect").value

    if (text != "" && priority != "") {
      if (dueDate != "") {
        if (moment(dueDate).format("X") < moment().format("X")) {
          alert("Plese, dont put dates before your current day.")

          return "";
        }
      }
      const data = {
        text: text,
        dueDate: dueDate == "" ? 0 : moment(dueDate).format("X"),
        status: false,
        doneDate: 0,
        priority: priority,
        creationDate: moment().format("X")
      }

      createNewTodo(data)
        .then(() => dispatch(setFlag(!flag)))
      clearFields()
    } else {
      alert("Please make sure to fill out all the fields")
    }
  }

  const editTodo = () =>{
    const text = document.getElementById("inputText").value
    const dueDate = document.getElementById("inputDueDate").value
    const priority = document.getElementById("prioritySelect").value

    if (text != "" && priority != "") {
      if (dueDate != "") {
        if (moment(dueDate).format("X") < moment().format("X")) {
          alert("Plese, dont put dates before your current day.")

          return "";
        }
      }

      const data = {
        id: todo.id,
        text: text,
        dueDate: dueDate == "" ?  0 : moment(dueDate).format("X"),
        status: todo.status,
        doneDate: todo.doneDate,
        priority: priority,
        creationDate: todo.creationDate
      }

      editTodoRequest(data)
        .then(() => dispatch(setFlag(!flag)))

      clearFields()
    } else {
      alert("Please make sure to fill out all the fields")
    }
  }
  
  return (
    <div className="modal modal" id="todoModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h1 className="modal-title fs-5">{type == "create" ? "Create new ToDo" : "Edit ToDo"}</h1>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={() => clearFields()}></button>
          </div>

          <div className="modal-body">
            {
              type == "create" ?
                <>
                  <div className="mb-4">
                    <label htmlFor="inputText">Text:</label>
                    <textarea className="w-100" id="inputText" cols={10} maxLength={120} defaultValue={type == "edit" ? todo.text : "" } />
                  </div>

                  <div className="row mb-4">
                    <div className="col-6">
                      <label className="form-label" htmlFor="inputDueDate">Due date:</label>
                      <input className="form-control" type="datetime-local" id="inputDueDate" min={moment().format("YYYY-MM-DDTHH:mm")}/>
                    </div>

                    <div className="col-6">
                      <label className="mb-2" htmlFor="prioritySelect">Priority:</label>
                      <select className="form-select" id="prioritySelect">
                        <option selected disabled value="default">All, High, Medium, Low</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                </>
              :
                <>
                  <div className="mb-4">
                    <label htmlFor="inputText">Text:</label>
                    <textarea className="w-100" id="inputText" cols={10} maxLength={120} />
                  </div>

                  <div className="row mb-4">
                    <div className="col-6">
                      <label className="form-label" htmlFor="inputDueDate">Due date:</label>
                      <input className="form-control" type="datetime-local" id="inputDueDate"/>
                    </div>

                    <div className="col-6">
                      <label className="form-label" htmlFor="prioritySelect">Priority:</label>

                      <select className="form-select" id="prioritySelect">
                        <option selected disabled value="default">All, High, Medium, Low</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                </>
            }
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => clearFields()}>Cancel</button>
            {
              type == "create" ?
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => saveTodo()}>Create ToDo</button>
              :
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => editTodo()}>Edit ToDo</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
