import React from 'react'

export default function Alert({ message }) {
  return <div className="alert alert-warning text-center" role="alert">{message}</div>
}