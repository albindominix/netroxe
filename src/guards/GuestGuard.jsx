import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function GuestGuard({children}) {

    const user= useSelector(({UserSlice})=>UserSlice.user)
    if(user?.email){
        return <Navigate to="/"/>
    }
  return (
    <>
      {children}
    </>
  )
}

export default GuestGuard
