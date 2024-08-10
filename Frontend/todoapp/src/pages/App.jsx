import React, { useEffect, useState } from 'react'
import * as bootstrap from 'bootstrap'
import { Navbar } from '../components/Navbar';
import { SearchFilter } from '../components/SearchFilter';
import { ToDoTable } from '../components/TodosTable/ToDoTable';
import { Stats } from '../components/Stats';
import { Pagination } from '../components/TodosTable/Pagination';
import { ToDoModal } from '../components/ToDoModal';
import { TAFooter } from '../components/TAFooter';
import { useSelector, useDispatch } from 'react-redux'
import { setTodosStore } from '../redux/slice'
import { getTodos } from '../js/axios';

export const App = () => {
  const todos = useSelector(state => state.todos.values.todos)
  const flag = useSelector(state => state.page.flag)
  const filters = useSelector(state => state.page.filters)
  const [type, setType] = useState("")

  const dispatch = useDispatch();

  const setTodos = async () => {
    const temp = await getTodos(filters)
    dispatch(setTodosStore(temp));
  }

  const clearFields = () => {
    const text = document.getElementById("inputText")
    const dueDate = document.getElementById("inputDueDate")
    const priority = document.getElementById("prioritySelect")

    text.value = ""
    dueDate.value = ""
    priority.options[0].selected = true
  }
  
  useEffect(() => {
    setTodos()
  }, [flag])
  

  return (
    <div>
      <Navbar />
      
      <ToDoModal clearFields={clearFields} type={type}/>

      <SearchFilter />

      <div className="mx-4 my-3">
        <button type="button" className="btn btn-secondary px-3" data-bs-toggle="modal" data-bs-target="#todoModal"
                onClick={() => {
                  clearFields()
                  setType("create")
                }} >+ New To Do</button>
      </div>

      <ToDoTable data={todos} setType={setType}/>

      <Pagination />

      <Stats />

      <TAFooter />
    </div>
  )
}
