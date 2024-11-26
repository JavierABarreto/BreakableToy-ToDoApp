import React, { useRef } from 'react'
import { getTodos } from '../js/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTodosStore } from '../redux/slice'
import { setFilter, setFlag } from '../redux/pageSlice'

export const SearchFilter = () => {
  const dispatch = useDispatch()
  const { filters, flag } = useSelector(state => ({
    filters: state.page.filters,
    flag: state.page.flag
  }))

  const textRef = useRef(null);
  const priorityRef = useRef(null);
  const statusRef = useRef(null);

  const search = async () => {
    const text = textRef.current.value;
    const priority = priorityRef.current.value;
    const status = statusRef.current.value;

    dispatch(setFilter({ payload: text, type: 'text' }));
    dispatch(setFilter({ payload: priority !== 'default' ? priority : 'default', type: 'getByPriority' }));
    dispatch(setFilter({ payload: status !== '0' ? status : 0, type: 'getByStatus' }));


    try {
      await getTodos(filters)
        .then((res) => dispatch(setTodosStore(res)))
      dispatch(setFlag(!flag))
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  }

  return (
    <div className="border mx-4 mt-4 p-4">
      <div className="row mb-2">
        <div className="col-1">
          <label htmlFor="inputText" className="col-form-label">Name</label>
        </div>
        <div className="col-11">
          <input type="text" id="inputTextSearchFilter" className="form-control" placeholder="text" maxLength={120} ref={textRef} />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-1">
          <label className="col-form-label">Priority</label>
        </div>
        <div className="col-4">
          <select className="form-select" id="prioritySelectSearchFilter" ref={priorityRef}>
            <option selected value={"default"} disabled key={"v-d"}>All, High, Medium, Low</option>
            <option value={"default"} key={"v-0"}>All</option>
            <option value={"High"} key={"v-3"}>High</option>
            <option value={"Medium"} key={"v-2"}>Medium</option>
            <option value={"Low"} key={"v-1"}>Low</option>
          </select>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-1">
          <label className="col-form-label">Status</label>
        </div>
        <div className="col-4">
          <select className="form-select" id="statusSelectSearchFilter" ref={statusRef}>
            <option selected value={0} disabled>All, Done, Undone</option>
            <option value={0}>All</option>
            <option value={1}>Done</option>
            <option value={2}>Undone</option>
          </select>
        </div>

        <div className="col-7 d-flex justify-content-end">
          <button className="btn btn-secondary px-5" onClick={() => search()}>Search</button>
        </div>
      </div>
    </div>
  )
}
