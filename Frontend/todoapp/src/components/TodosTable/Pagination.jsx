import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTodosStore } from '../../redux/slice'
import { getTodosByLimits } from '../../js/axios'

export const Pagination = ({ nElements }) => {
  const dispatch = useDispatch()
  let [currentPage, setCurrentPage] = useState(1)
  let min = 1, max = 10;

  const nPages = nElements < 10 ? 1 : Math.round(nElements/10) + 1

  const pag = () => {
    const temp = []

    for(let i = 0; i < nPages; i++) {
      temp.push(<li key={i}><button type="button" className="btn btn-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button></li>)
    }

    return temp
  }

  const changePage = (direction) => {
    direction == "n" ?  setCurrentPage(currentPage + 1) : setCurrentPage(direction)
  }

  const getTodosByPage = async () => {
    max = currentPage * 10;
    min = max - 9;

    const temp = await getTodosByLimits(max, min)
    dispatch(setTodosStore(temp));
  }
  
  useEffect(() => {
    getTodosByPage()
  }, [currentPage])

  return (
    <div className="mx-4 mb-3 w-75">
      <div className="d-flex justify-content-center">
        <ul className="pagination border px-5 py-3">
          <li>
            <button type="button" className="btn btn-link" onClick={() => changePage("p")} disabled = { currentPage == 1 ? true : currentPage == nPages ? true : false }>&laquo;</button>
          </li>

          {
            pag()
          }

          <li>
            <button type="button" className="btn btn-link" onClick={() => changePage("n")} disabled={currentPage == nPages ? true : false}>&raquo;</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
