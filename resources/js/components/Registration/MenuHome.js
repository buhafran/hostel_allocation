import {Formik} from 'formik';
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
      import {Link } from 'react-router-dom'
      import { Redirect } from 'react-router-dom';
      import logo from '../Assets/img/jcoe_small.jpg';

 export default class MenuHome extends Component{
  constructor(){
    super();
    this.state={
      isSubmitting:false,
      error:"",
      success:""
    }
  }
  componentDidMount()
  {

  }
    handleSubmit(values)
   {
  

    }
      render(){
        return this.state.success!=='' ? ( <Redirect to="/student/reservation"/> ) :(
          <div>
              <div className="text-center">
                <img src={logo} style={{ height:'70px'}}/>
  <br/>
  <h1> JIGAWA STATE COLLEGE OF EDUCATION</h1>
  <br/>       
      
     
              </div>

              <hr />
<div className="row">
<div  className="col-sm-4 offset-sm-1"> 

     <Link to='/auth/register' className="btn btn-success btn-user">
  <i className="fas fa-bed fa-lg text-white-50"></i><br/>
     Student`s Hostel Reservation</Link>
     <br/>
    <small> <Link to='/auth/login'>Reprint reservation</Link></small>

</div>
<div  className="col-sm-4 offset-sm-1">
     <Link to='/student/registration' className="btn small btn-danger btn-user">
  <i className="fas fa-user fa-lg text-white-50"></i><br/>
     <small>Spill Over Student Registration</small></Link>
     <br/>
</div>
</div>

   
  
              <hr />
              <div className="text-center">
                      <Link to='/amin/auth/login' className="small  btn-link">
           
              </Link>

              </div>
              </div>
          )
      }

    }



  




                  