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
import { setTypeModal } from '../redux/pageSlice'
import { getTodos } from '../js/axios';

export const App = () => {
  const todos = useSelector(state => state.todos.value)
  const flag = useSelector(state => state.page.flag)

  const dispatch = useDispatch();

  const nElements = todos.length

  const setTodos = async () => {
    const temp = await getTodos()
    dispatch(setTodosStore(temp));
  }
  
  useEffect(() => {
    setTodos()
  }, [flag])
  

  return (
    <div>
      <Navbar />
      <ToDoModal />

      <SearchFilter />

      <div className="mx-4 my-3">
        <button type="button" className="btn btn-secondary px-3" data-bs-toggle="modal" data-bs-target="#todoModal"
                onClick={() => dispatch(setTypeModal("create"))}>+ New To Do</button>
      </div>

      <ToDoTable data={todos} />

      <Pagination nElements={nElements} />

      <Stats />

      <TAFooter />
    </div>
  )
}
