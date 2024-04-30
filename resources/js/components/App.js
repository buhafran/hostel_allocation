import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
   import Body from './Body'
   import Home from './HomePage/Home'
   import ProductDetails from './HomePage/ProductDetails'
   
import {NotFound,UnAuthorized,InternalError} from './Error'
import {VehicleList,VehicleDetails,CreateVehicle,CreateVehicleExpenses} from './Vehicle'
import {CreateProduct,
ProductList,
CreateBrand,
BrandList,
CreateCategory,
CategoryList,
CreateModel,
ModelList
      }  from './Product';
import {UserActivityLog} from './Activity'
import {ListOrder,AcceptedOrder,OrderDetails} from './Order';
import {
  CreateFleet,
ListFleet
} from './Fleet';
import {
  VendorList,
CreateVendor
} from './Vendor';
import {CustomerList,CustomerDetails} from './Customer'

import {ChangePassword,
        UserForm,
        UsersList,UserDetails,UserProfile,CreateUser,UserAdminProfile} from './Users'
import {Refund,Payments,TransactionDetails,Transactions} from './Transaction'
import {Dashboard} from './Dashboard'
import {Reservation} from './Reservation'
import {Allocations} from './Allocations'

import AuthBody from './AuthBody'
//import {CreateFareRate,ListFareRate} from './FareRate'
import PrivateRoute from './PrivateRoute';
import AdminPrivateRoute from './AdminPrivateRoute';
import {Login,AdminLogin,RegistrationPayment} from './Auth'
import {PaymentInvoice,MenuHome,RegTransactions} from './Registration'
import {Register} from './Auth'
    class App extends Component {
      render () {
        return (
          <BrowserRouter>
            <div>
              <Switch>          
                

               <PrivateRoute exact path='/student/reservation' component={Reservation} />
                <PrivateRoute exact path='/student/profile'  component={UserProfile} />

                <AdminPrivateRoute exact path='/admin/transactions'  component={RegTransactions} />
                <AdminPrivateRoute exact path='/admin/allocations'  component={Allocations} />
                <AdminPrivateRoute exact path='/admin/account'  component={UserAdminProfile} />

                <Route path='/404' exact component={NotFound} />
                <Route path='/401' exact component={UnAuthorized} />
                <Route path='/500' exact component={InternalError} />

                // <Route path='/shop/search' exact component={Home} />
                // <Route path='/shop/category/:parent/:child' exact component={Home} />
                // <Route path='/shop/category/:parent' exact component={Home} />
                // <Route path='/shop/category' exact component={Home} />
                // <Route path='/shop/product/:name' exact component={ProductDetails} />
                // <Route path='/shop' exact component={Home} />
               <Route exact path='/student/invoice/:id' component={PaymentInvoice} />
              <AuthBody>
               <Route exact path='/student/registration' component={RegistrationPayment} />
                <Route path='/auth/register' exact component={Register} />
                <Route path='/auth/login' exact component={Login} />
                <Route path='/admin/auth/login' exact component={AdminLogin} />
                <Route path='/auth/password_reset' exact component={Login} />
               <Route exact path='/student' component={MenuHome} />
              </AuthBody>
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
        </BrowserRouter>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))