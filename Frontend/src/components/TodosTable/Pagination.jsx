import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setFlag } from '../../redux/pageSlice'

export const Pagination = () => {
  const dispatch = useDispatch()
  const flag = useSelector(state => state.page.flag)

  let { currentPage, nPages } = useSelector(state => ({
    currentPage: state.todos.values.currentPage,
    nPages: state.todos.values.nPages
  }))

  const pag = () => {
    const pagNums = []

    for(let i = 0; i < nPages; i++) {
      pagNums.push(<li key={"pagination-"+(i+1)}><button type="button" className="btn btn-link" 
                       onClick={() => getTodosByPage(i+1)}>{i+1}</button></li>)
    }

    return pagNums
  }

  const getTodosByPage = (pageNumber) => {
    const limit = pageNumber * 10;

    dispatch(setFilter({ payload: limit, type: "max" }));
    dispatch(setFilter({ payload: limit - 9, type: "min" }));
    dispatch(setFlag(!flag));
  }; 

  const changePage = useCallback(async (direction) => {
    const newPage = direction === "n" ? currentPage + 1 : currentPage - 1;
    if ((direction === "n" && currentPage !== nPages) || (direction === "p" && currentPage !== 1)) {
      getTodosByPage(newPage);
    }
  }, [currentPage, nPages, getTodosByPage]);

  return (
    <div className="mx-4 mb-3">
      <div className="d-flex justify-content-center">
        <ul className="pagination border px-5 py-3">
          <li>
            <button type="button" className="btn btn-link" onClick={() => changePage("p")} disabled = { currentPage == 1 }>&laquo;</button>
          </li>

          {
            pag()
          }

          <li>
            <button type="button" className="btn btn-link" onClick={() => changePage("n")} disabled={currentPage == nPages }>&raquo;</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
