import React from 'react'

export const Pagination = () => {
  return (
    <div className="mx-4 mb-3 w-75">
      <div className="d-flex justify-content-center">
        <ul class="pagination border px-5 py-3">
          <li>
            <button type="button" class="btn btn-link" disabled>&laquo;</button>
          </li>

          <li><button type="button" class="btn btn-link">1</button></li>

          <li>
            <button type="button" class="btn btn-link" disabled>&raquo;</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
