import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setFlag } from '../../redux/pageSlice'

export const Pagination = () => {
  const dispatch = useDispatch()
  const nPages = useSelector(state => state.todos.values.nPages)
  const flag = useSelector(state => state.page.flag)
  const currentPage = useSelector(state => state.todos.values.currentPage)

  const pag = () => {
    const pagNums = []

    for(let i = 0; i < nPages; i++) {
      pagNums.push(<li key={"pagination-"+(i+1)}><button type="button" className="btn btn-link" 
                       onClick={() => getTodosByPage(i+1)}>{i+1}</button></li>)
    }

    return pagNums
  }

  const getTodosByPage = async (n) => {
    let limit = n * 10;

    dispatch(setFilter({ payload: limit, type: "max" }))
    dispatch(setFilter({ payload: limit - 9, type: "min" }))

    dispatch(setFlag(!flag));
  }

  const changePage = async (dir) => {
    if( dir == "n" ){
      if (currentPage != nPages) {
        getTodosByPage(currentPage + 1)
      }
    } else {
      if (currentPage != 1) {
        getTodosByPage(currentPage - 1)
      }
    }
  }

  return (
    <div className="mx-4 mb-3">
      <div className="d-flex justify-content-center">
        <ul className="pagination border px-5 py-3">
          <li>
            <button type="button" className="btn btn-link" onClick={() => changePage("p")} disabled = { currentPage == 1 ? true : false }>&laquo;</button>
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
