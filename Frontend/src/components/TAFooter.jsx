import React from 'react'

export const TAFooter = () => {
  return (
    <div className="bg-dark text-white d-flex justify-content-center py-5">
      <p>@{new Date().getFullYear()} TodoApp Copyright</p>
    </div>
  )
}
