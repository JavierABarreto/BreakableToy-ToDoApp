import React from 'react'

export const TableRow = ({ data }) => {
  const { id, text, priority, dueDate } = data

  return (
    <>
      {
        id != null || id != undefined ?
        <tr key={"row-"+id} className="" >
          <th scope="row" className="text-center"><input type="checkbox" /></th>
          <td className="col-4">{text}</td>
          <td className="col-2">{priority}</td>
          <td className="col-2">{dueDate}</td>
          <td className="col-3">
            <button className="btn btn-warning mx-2">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
        :
        <tr key={"row-"+id} className="text-white" >
          <th scope="row" className="text-center"><input type="checkbox" /></th>
          <td className="col-4">{text}</td>
          <td className="col-2">{priority}</td>
          <td className="col-2">{dueDate}</td>
          <td className="col-3">
          </td>
        </tr>
      }
    </>
  )
}
