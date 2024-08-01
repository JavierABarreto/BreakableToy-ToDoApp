import React from 'react'
import { TableRow } from './TableRow'

export const ToDoTable = () => {
  return (
    <div className="mx-4 w-75">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>{"Priority <>"}</th>
            <th>{"Due Date <>"}</th>
            <th>Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {
            fakeData.map((todo) => {
              return <TableRow data={todo} />
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const fakeData = [
  {
    id: "1",
    text: "asd",
    dueDate: "10/10/2024",
    status: false,
    doneDate: "asd",
    priority: "High",
    creationDate: "asd"
  },
  {
    id: "2",
    text: "asd",
    dueDate: "10/10/2024",
    status: false,
    doneDate: "asd",
    priority: "Medium",
    creationDate: "asd"
  },
  {
    id: "3",
    text: "asd",
    dueDate: "10/10/2024",
    status: false,
    doneDate: "1",
    priority: "Low",
    creationDate: "asd"
  },
  {

  },
  {

  },
  {

  },
  {

  },
  {

  },
  {

  },
  {

  }
]