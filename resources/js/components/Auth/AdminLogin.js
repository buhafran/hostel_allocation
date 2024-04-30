import {Formik} from 'formik';
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
      import {Link } from 'react-router-dom'
      import Auth from './Auth';
      import { Redirect } from 'react-router-dom';
      import logo from '../Assets/img/jcoe_small.jpg';
    //import { BrowserRouter, Route, Switch } from 'react-router-dom'

 export default class AdminLogin extends Component{
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
      let auth= new Auth;
    if(auth.isAdminAuthenticated())
    {
           this.setState({
           ... this.state,
        success:"Login Success ... redirecting"
      })
    }
  }
    handleSubmit(values)
   {
   // console.log(values)
    this.setState({
      ... this.state,
      isSubmitting:true,
      success:"",
      error:""
    })
    let auth= new Auth;
      //console.log("Login",values);
    auth.AdminLogin(values.email,values.password,(res)=>{
     // console.log(res);
      if(res==200)
      {
         this.setState({
           ... this.state,
        isSubmitting:false,
        error:"",
        success:"Login Success ... redirecting"
      })
      }
      else if(res==401)
      {
              this.setState({
           ... this.state,
        isSubmitting:false,
        error:"Invalid Login Credentials",
      })
      }
      else
      {
            this.setState({
           ... this.state,
        isSubmitting:false,
        error:"An Error Occured",
      })
      }

    }).then(()=>{

    })


    }
      render(){
        return this.state.success!=='' ? ( <Redirect to="/admin/allocations"/> ) :(
          <div>
              <div className="text-center">
                 <img src={logo} style={{ height:'30px'}}/>
                <h1 className="h3 text-gray-900 mb-4">Welcome Back</h1>
                <span className="text-danger" role="alert" id="loginError">
                      {this.state.error}
                  <br />
                </span>
              </div>


        <Formik
       initialValues={{ email: '', password: ''}}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Email is Required';
         } 
         if (!values.password) {
          errors.password = 'Password Required';
        } 
         return errors;
       }}
    
       onSubmit={(values, { setSubmitting }) => {
        
        //setSubmitting(!props.handleFormSubmit(values));
        this.handleSubmit(values);
     

        //return <Redirect to="/home/vehicles" />
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit} className="user">
            <div className="form-group">

           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             className="form-control  form-control-user"
              placeholder="Enter Email Address..." 
        
           />
           <span className='text-danger'>{errors.email && touched.email && errors.email}</span>
           </div>
           <div className="form-group">

           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
             className="form-control form-control-user"
             placeholder="password"
           />
           <span className='text-danger'>{errors.password && touched.password && errors.password}</span>
           </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox small">
                  <input type="checkbox" className="custom-control-input" id="customCheck" />
                  <label className="custom-control-label" htmlFor="customCheck" >Remember Me</label>
                </div>
              </div>
         
               <button type="submit" className="btn btn-danger btn-user btn-block disable_login"  disabled={this.state.isSubmitting}>
              {this.state.isSubmitting? 
                  <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                :'Login'}
              </button>
         </form>
       )}
     </Formik>
              <hr />
              <div className="text-center">
                     
              </div>
              </div>
          )
      }

    }



  




                  