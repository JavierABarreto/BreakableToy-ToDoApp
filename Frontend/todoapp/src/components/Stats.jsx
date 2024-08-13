import React from 'react'


export const Stats = ({ avgPriorityAll, priorities }) => {
  return (
    <div className="row mx-4 border px-4 py-2 mb-4">
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
            <p className="flex-fill">Avg: {avgPriorityAll}</p>
          </div>

          <div className="col-6 text-center">
            <p className='m-0'>Low: {priorities.avgPriorityLow}</p>
            <p className='m-0'>Medium: {priorities.avgPriorityMedium}</p>
            <p className='m-0'>High: {priorities.avgPriorityHigh}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
