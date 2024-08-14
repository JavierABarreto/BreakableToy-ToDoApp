import moment from 'moment'
import React from 'react'


export const Stats = ({ avgPriorityAll, priorities }) => {
  const timeToMinutes = (seconds) => {
    const time = moment.duration(seconds, "seconds")
    const mins = time.minutes()
    const secs = time.seconds()

    return (mins < 10 ? `0${mins}` : mins )+ ":" + (secs < 10 ? `0${secs}` : secs)
  }

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
            <p className="flex-fill">Avg: {timeToMinutes(avgPriorityAll) + " minutes"}</p>
          </div>

          <div className="col-6 text-center">
            <p className='m-0'>Low: {timeToMinutes(priorities.avgPriorityLow) + " minutes"}</p>
            <p className='m-0'>Medium: {timeToMinutes(priorities.avgPriorityMedium) + " minutes"}</p>
            <p className='m-0'>High: {timeToMinutes(priorities.avgPriorityHigh) + " minutes"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
