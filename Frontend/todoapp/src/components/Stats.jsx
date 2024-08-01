import React from 'react'

export const Stats = () => {
  return (
    <div className="row mx-4 w-75 border px-4 py-2 mb-4">
      <div className="row">
        <div className="row text-center">
          <div className="col-6">
            <p>Average time to fiinsh tasks:</p>
          </div>

          <div className="col-6">
            <p>Average time to finish by priority:</p>
          </div>
        </div>

        <div className="row">
          <div className="col-6 text-center d-flex align-items-center">
            <p className="flex-fill">--:-- minutes</p>
          </div>

          <div className="col-6 ">
            <p className='m-0'>Low: --:-- mins</p>
            <p className='m-0'>Medium: --:-- mins</p>
            <p className='m-0'>High: --:-- mins</p>
          </div>
        </div>
      </div>
    </div>
  )
}
