
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
      import {Link } from 'react-router-dom'
    //import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {getLoginUser} from './Actions/admin'; 
import Auth from './Auth/Auth';
 import {Redirect} from 'react-router-dom'

 export default   class AdminBody extends Component{


constructor(){
  super();
  this.state={
    isLoggedOut:false,
    user:{role:'--', name:'--'}
  }
}


onLogout(){
  
  const auth=new Auth();
  auth.admin_logout(response=>{
    if(response)
    {
      if(response.status===202 || response.this.state===401)
      {
        swal('Success',"Logout Successful",'success');
          this.setState({
            ...this.state,
            isLoggedOut:true
          })
      }
    }
  });

}
componentDidMount()
{

  getLoginUser(response=>{
    if(response)
    {  
      this.setState({
        ...this.state,
        user:response
      })
    }
  })
    
}
      render(){
        return this.state.isLoggedOut? <Redirect to="/admin/auth/login"/>:(
    <div id="wrapper">


    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
      
        <div className="sidebar-brand-text mx-3">JSCOE ADMIN   <small> HOSTEL </small></div>
      </a>

      <hr className="sidebar-divider my-0" />


 <li className="nav-item">
         <Link to='/admin/allocations' className="nav-link">

          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Allocations</span>
       </Link>   

       <Link to="/admin/transactions" className="nav-link">

          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Other Payments</span>
       </Link> 


        <Link to='/admin/account' className="nav-link">

          <i className="fas fa-fw fa-user"></i>
          <span>My Account</span>
       </Link>
         
      </li>

      <hr className="sidebar-divider"></hr>



{/*

      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#headingTransactions" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-money-bill-alt"></i> 
          <span>Transactions</span>
        </a>
        <div id="headingTransactions" className="collapse" aria-labelledby="headingTransactions" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Manage</h6>
              <Link to='/admin/payments'><span className="collapse-item">Payments</span></Link>
          </div>
        </div>
      </li>

      <hr className="sidebar-divider" />
*/}

      <div className="sidebar-heading">
        User
      </div>

     
      <li className="nav-item">
        <a className="nav-link"  data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          <span>Logout</span></a>
      </li>  
      

      <hr className="sidebar-divider d-none d-md-block"></hr>

  
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>

    <div id="content-wrapper" className="d-flex flex-column">


      <div id="content">


        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>

    

          <ul className="navbar-nav ml-auto">

            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-envelope fa-fw"></i>
              
                <span className="badge badge-danger badge-counter">0</span>
              </a>

              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                <h6 className="dropdown-header">
                  Notifications
                </h6>
 
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>


            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.user.name}<br/><small>{this.state.user.role}</small></span>

                <img className="img-profile rounded-circle" />
              </a>

              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
           {/*
                  <Link to='/admin/profile' className="dropdown-item" ><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i><span className="collapse-item">My Account</span></Link>
                  <Link to='/admin/activity' className="dropdown-item" ><i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i><span className="collapse-item">Activity Logs</span></Link>
           */}
              
             
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>

          </ul>

        </nav>

        <div className="container-fluid">



{this.props.children}



      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Powered By <a href="#">Algadong IT Solutions LTD</a></span>
          </div>
        </div>
      </footer>


    </div>


  </div>



  <a className="scroll-to-top rounded" href="#page-top">
    <i className="fas fa-angle-up"></i>
  </a>


  <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
          <button className="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">Are you sure you want to logout? </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
          <button className="btn btn-primary" data-dismiss="modal"
          onClick={()=>this.onLogout()}
          // onClick={function(){event.preventDefault(); document.getElementById('logout-form').submit();} }
                                                     >Logout</button>
        </div>
      </div>
    </div>
</div>
</div>
</div>

          )
      }

    }



  