import React from 'react'
import * as bootstrap from 'bootstrap'
import moment from 'moment'
import { createNewTodo, editTodoRequest } from '../js/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFlag } from '../redux/pageSlice'

export const ToDoModal = () => {
  const dispatch = useDispatch();
  const flag = useSelector(state => state.page.flag)
  const type = useSelector(state => state.page.type)
  const todo = useSelector(state => state.todos.todo)

  let text = ""
  let dueDate = ""
  let priority = ""

  if(type == "edit") {
    text = todo.text
    dueDate = todo.dueDate
    priority = todo.priority

    document.getElementById("inputDueDate").value = moment(dueDate, "YYYY-MM-DD").format("YYYY-MM-DDThh:mm")
    document.getElementById("prioritySelect").value = priority
  }

  const saveTodo = () => {
    const text = document.getElementById("inputText").value
    const dueDate = document.getElementById("inputDueDate").value
    const priority = document.getElementById("prioritySelect").value

    if (text != "" && priority != "" && dueDate != "") {
      const data = {
        text: text,
        dueDate: moment(dueDate).format("YYYY-MM-DDThh:mm a"),
        status: false,
        doneDate: "",
        priority: priority,
        creationDate: moment().format("YYYY-MM-DDThh:mm a")
      }

      createNewTodo(data)
        .then (() => alert("New ToDo created!"))
      dispatch(setFlag(!flag));
    } else {
      alert("Please make sure to fill out all the fields")
    }
  }

  const editTodo = () =>{
    const text = document.getElementById("inputText").value
    const dueDate = document.getElementById("inputDueDate").value
    const priority = document.getElementById("prioritySelect").value

    if (text != "" && priority != "" && dueDate != "") {
      const data = {
        id: todo.id,
        text: text,
        dueDate: moment(dueDate).format("YYYY-MM-DDThh:mm a"),
        status: todo.status,
        doneDate: todo.doneDate,
        priority: priority,
        creationDate: todo.creationDate
      }

      editTodoRequest(data)
        .then (() => alert("ToDo has been updated!"))

      dispatch(setFlag(!flag));
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
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            {
              type == "create" ?
                <>
                  <div className="mb-4">
                    <p>Text</p>
                    <textarea className="w-100" id="inputText" cols={10} maxLength={120} />
                  </div>

                  <div className="row mb-4">
                    <div className="col-6">
                      <p className="mb-2">Due date:</p>
                      <input type="datetime-local" id="inputDueDate"/>
                    </div>

                    <div className="col-6">
                      <p className="mb-2">Priority:</p>

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
                    <p>Text</p>
                    <textarea className="w-100" id="inputText" cols={10} maxLength={120} defaultValue={text}/>
                  </div>

                  <div className="row mb-4">
                    <div className="col-6">
                      <p className="mb-2">Due date:</p>
                      <input type="datetime-local" id="inputDueDate"/>
                    </div>

                    <div className="col-6">
                      <p className="mb-2">Priority:</p>

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
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
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
