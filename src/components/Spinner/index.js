import React from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import Loader from 'react-loader-spinner'
import './spinner.css'

export const Spinner = props => {
  const { promiseInProgress } = usePromiseTracker()

  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="Circles" color="red" height={80} width={80} />
      </div>
    )
  )
}
