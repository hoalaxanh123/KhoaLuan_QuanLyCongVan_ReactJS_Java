import React from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import Loader from 'react-loader-spinner'
import './spinner.css'

export const Spinner = props => {
  const { promiseInProgress } = usePromiseTracker()

  return (
    //promiseInProgress &&
    promiseInProgress && (
      <div className="spinner">
        {/* <Loader type="Circles" color="red" height={80} width={80} /> */}
        {/* <Loader type="Audio" color="red" height={80} width={80} /> */}
        {/* <Loader type="Ball-Triangle	" color="red" height={80} width={80} /> */}
        {/* <Loader type="Bars" color="red" height={80} width={80} /> */}
        {/* <Loader type="Grid" color="red" height={80} width={80} /> */}
        <Loader type="Oval" color="red" height={100} width={100} />
        {/* <Loader type="Rings" color="red" height={80} width={80} /> */}
        {/* <Loader type="Puff" color="red" height={80} width={80} /> */}
        {/* <Loader type="TailSpin" color="red" height={80} width={80} /> OK */}
        {/* <Loader type="ThreeDots" color="red" height={80} width={80} /> */}
      </div>
    )
  )
}
