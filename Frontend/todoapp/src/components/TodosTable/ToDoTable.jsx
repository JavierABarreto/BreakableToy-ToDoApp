import React, { useState } from 'react'
import { TableRow } from './TableRow'
import { useDispatch } from 'react-redux';
import { getTodosSortedByPriority } from '../../js/axios';
import { setTodosStore } from '../../redux/slice';

export const ToDoTable = ({ data }) => {
  const [pOrder, setPOrder] = useState("asc");

  const dispatch = useDispatch()

  const sortByPriority = async () => {
    setPOrder(pOrder == "asc" ? "dsc" : "asc")

    const temp = await getTodosSortedByPriority(pOrder)
    dispatch(setTodosStore(temp))
  }

  return (
    <div className="mx-4 w-75">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">
              <input type="checkbox" />
            </th>

            <th className='d-flex align-items-center'>
              <span className="d-flex justify-content-center">Name</span>
            </th>

            <th>
              <span className='d-flex align-items-center'>
                <button type="button" className="btn" onClick={() => sortByPriority()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-vertical" viewBox="0 0 16 16">
                    <path d="M8.354 14.854a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 13.293V2.707L6.354 3.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 2.707v10.586l1.146-1.147a.5.5 0 0 1 .708.708z"/>
                  </svg>
                </button>
                {" Priority"}
              </span>
            </th>

            <th>
              <span className='d-flex align-items-center'>
                <button type="button" className="btn" onClick={() => sortByPriority()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-vertical" viewBox="0 0 16 16">
                    <path d="M8.354 14.854a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 13.293V2.707L6.354 3.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 2.707v10.586l1.146-1.147a.5.5 0 0 1 .708.708z"/>
                  </svg>
                </button>
                {" Date"}
              </span>
            </th>
            
            <th>
              <span className="d-flex align-items-center">Actions</span>
            </th>
          </tr>
        </thead>
        
        <tbody>
          {
            data?.map((todo, index) => {
              return <TableRow data={todo} key={index}/>
            })
          }
        </tbody>
      </table>
    </div>
  )
}
