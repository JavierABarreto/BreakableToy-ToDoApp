import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFlag } from '../../redux/pageSlice'
import { setTodo } from '../../redux/slice'
import moment from 'moment'
import { changeTodoStatus, deleteTodo } from '../../js/axios'

export const TableRow = ({ data, setType }) => {
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
    const doneDate = moment().format("X")

    const data = {
      id: id,
      as: as,
      doneDate: doneDate
    }

    changeTodoStatus(data)

    dispatch(setFlag(!flag))
  }

  let dDate = dueDate == 0 ? "" : moment.unix(dueDate).format("DD-MM-YYYY - hh:mm a")

  const rowColor = () => {
    if (dueDate > 0) {
      const today = moment().format("X");
      const days = Math.round(((dueDate - today) / (60 * 60 * 24)))

      return days <= 7 ? "table-danger" : days <= 14 ? "table-warning" : "table-success"
    }
  }

  useEffect(() => {
    rowColor()
  })

  return (
    <tr className={`${rowColor()}`} key={"row-"+id}>
      <th scope="row" className="text-center"><input type="checkbox" id={"cb-"+id} onChange={(e) => markAsDone(e)} checked={status} /></th>
      <td className="col-4">{text}</td>
      <td className="col-2">{priority}</td>
      <td className="col-2">{dDate}</td> 
      <td className="col-3">
        {
          <>
            {
              !status ? 
                <button className="btn btn-secondary mx-2" data-bs-toggle="modal" data-bs-target="#todoModal"
                onClick={() => {
                  dispatch(setTodo(data))
                  setType("edit")
                }}>Edit</button>
              :
                <></>
            }
            <button className="btn btn-secondary mx-2" onClick={() => deleteFunction()}>Delete</button>
          </>
        }
      </td>
    </tr>
  )
}
