import React from 'react'
import { Navigate } from 'react-router'
const PrivateRoute = ({component}) => {
    const authToken = localStorage.getItem('authToken');
  return authToken? component : <Navigate to={'/'} />
}

export default PrivateRoute
