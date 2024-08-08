import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFlag, setTypeModal } from '../../redux/pageSlice'
import { setTodo } from '../../redux/slice'
import moment from 'moment'
import { changeTodoStatus, deleteTodo } from '../../js/axios'

export const TableRow = ({ data }) => {
  const { id, text, priority, dueDate, status } = data
  const dispatch = useDispatch()
  const flag = useSelector(state => state.page.flag)

  const deleteFunction = () => {
    if(confirm("Are you sure you want to delete this ToDo?")) {
      deleteTodo(data)
        .then(() => alert("ToDo has been deleted."))
      
      dispatch(setFlag(!flag))
    }
  }

  const markAsDone = (e) => {
    const as = e.target.value == true ? "undone" : "done"
    const doneDate = moment().format("YYYY-MM-DDThh:mm a")

    const data = {
      id: id,
      as: as,
      doneDate: doneDate
    }

    changeTodoStatus(data)

    dispatch(setFlag(!flag))
  } 

  return (
    <tr key={"row-"+id}>
      <th scope="row" className="text-center"><input type="checkbox" id={"cb-"+id} onChange={(e) => markAsDone(e)} checked={status} /></th>
      <td className="col-4">{text}</td>
      <td className="col-2">{priority}</td>
      <td className="col-2">{moment(dueDate, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
      <td className="col-3">
        <button className="btn btn-link mx-2" data-bs-toggle="modal" data-bs-target="#todoModal"
                onClick={() => {
                  dispatch(setFlag(!flag))
                  dispatch(setTodo(data))
                  dispatch(setTypeModal("edit"))
                }}>Edit</button>
        <button className="btn btn-link" onClick={() => deleteFunction()}>Delete</button>
      </td>
    </tr>
  )
}
