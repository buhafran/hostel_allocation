import React from 'react'
//import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom'
import Auth from './Auth/Auth'
   import Body from './Body'
const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
 const auth= new Auth;

  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated() ? (
            <Body><Component {...props} /></Body>
        ) : (
          <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute