import React from 'react'
import * as bootstrap from 'bootstrap'
import { Navbar } from '../components/Navbar';
import { SearchFilter } from '../components/SearchFilter';
import { ToDoTable } from '../components/TodosTable/ToDoTable';
import { Stats } from '../components/Stats';
import { Pagination } from '../components/TodosTable/Pagination';
import { ToDoModal } from '../components/ToDoModal';
import { TAFooter } from '../components/TAFooter';

export const App = () => {

  return (
    <div>
      <Navbar />
      <ToDoModal />

      <SearchFilter />

      <div className="mx-4 my-3">
        <button type="button" className="btn btn-secondary px-3" data-bs-toggle="modal" data-bs-target="#todoModal">+ New To Do</button>
      </div>

      <ToDoTable />

      <Pagination />

      <Stats />

      <TAFooter />
    </div>
  )
}
