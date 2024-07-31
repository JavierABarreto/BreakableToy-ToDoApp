import React from 'react'
import { useDispatch } from 'react-redux'
import { greeting } from '../store/slice';

export const App = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>App</h2>

      <button onClick={() => dispatch(greeting())}>Greeting</button>
    </div>
  )
}
