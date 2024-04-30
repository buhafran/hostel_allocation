import React from 'react'
//import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom'
import Auth from './Auth/Auth'
   import AdminBody from './AdminBody'
const AdminPrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
 const auth= new Auth;

  return (
    <Route
      {...rest}
      render={props =>
        auth.isAdminAuthenticated() ? (
            <AdminBody><Component {...props} /></AdminBody>
        ) : (
          <Redirect to={{ pathname: '/admin/auth/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default AdminPrivateRoute