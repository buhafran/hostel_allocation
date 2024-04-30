import {Formik} from 'formik';
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
      import {Link } from 'react-router-dom'
      import Auth from './Auth';
      import { Redirect } from 'react-router-dom';
      import logo from '../Assets/img/jcoe_small.jpg';
      import {registerUser} from "../Actions"
    //import { BrowserRouter, Route, Switch } from 'react-router-dom'

 export default class Register extends Component{
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
    if(auth.isAuthenticated())
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
    auth.Login(values.email,values.password,(res)=>{
      console.log(res);
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
        //this.state.success!==''
        return  false ? ( <Redirect to="/auth/login"/> ) :(
          <div>
              <div className="text-center">
                <img src={logo} style={{ height:'30px'}}/>
            {/*
            */}
                <h1 className="h4 text-gray-900 mb-4"><b>STUDENT HOSTEL RESERVATION</b> <br/>Register here</h1>
                <span className="text-danger" role="alert" id="loginError">
                      {this.state.error}
                  <br />
                </span>
            {/* <p className="alert alert-info"> <b>SpillOver</b> Students can make registration payment using the Url below <a href="https://jscoeg.net/student/registration">{'https://jscoeg.net/student/registration'}</a></p>
               */}
                {
this.state.success!==""?
                   <p className="alert alert-success" role="alert" id="">
                      {this.state.success}
                      <Link to="/auth/login">Login here</Link>
           
                </p>
                :
                <span></span>
                }
              
              </div>


        <Formik
       initialValues={{ email: '', password: '', registration_number:'', category:"",name:"",phone:'', gender:'', state:''}}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Email is Required';
         } 
           if (!values.name) {
           errors.name = 'Your name is Required';
         } 
            if (!values.registration_number) {
           errors.registration_number = 'Registration Number is Required';
         }
       if (!values.phone) {
           errors.phone = 'Phone Number is Required';
         } 
         if (!values.category) {
           errors.category = 'Category is Required';
         } 
        //     if (!values.state) {
        //   errors.state = 'State Required';
        // } 
           if (!values.gender) {
          errors.gender = 'Gender Required';
        } 
         if (!values.password) {
          errors.password = 'Password Required';
        } 
         return errors;
       }}
    
    onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
       
        
        //setSubmitting(!props.handleFormSubmit(values));
        console.log("Create Account", values)
        //this.handleSubmit(values);
       this.setState({
          ... this.state,
          isSubmitting:true,
          success:"",
          error:""
        })
                registerUser(values, (response)=>{
console.log(response)
                 if(response)
                      { 
                        if(response.errors)
                        {
                            setErrors(response.errors)
                        }
                        else
                        {     
                           swal("Success!", "Account Successfully, Check Your email to confirm ", "success");
                            this.setState({
                              ...this.state,
                              formsubmitted: true
                            })
                               resetForm();
                          }
                               this.setState({
                                  ... this.state,
                                  isSubmitting:false,
                                  success:"Account Created Sucessfully ",
                                  error:""
                                })
                        }
                        else
                        {
                          this.setState({
                                  ... this.state,
                                  isSubmitting:false
                                
                                })

                           swal("Error!", "Server Returned an Error ", "error");
                        }
                })

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
             type="text"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
             className="form-control  form-control-user"
              placeholder="Full Name" 
        
           />
           <span className='text-danger'>{errors.name && touched.name && errors.name}</span>
           </div>
          <div className="form-group">

           <input
             type="text"
             name="registration_number"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.registration_number}
             className="form-control  form-control-user"
              placeholder="Registration Number" 
        
           />
           <span className='text-danger'>{errors.registration_number && touched.registration_number && errors.registration_number}</span>
           </div>

            <div className="form-group">
           <input
             type="text"
             name="phone"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.phone}
             className="form-control  form-control-user"
              placeholder="Phone Number" 
        
           />
           <span className='text-danger'>{errors.phone && touched.phone && errors.phone}</span>
           </div>
    <div className="form-group">
               <label htmlFor="category">Programme Category</label>
                     <select
                        type=""
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                    
                       <option key={233} value="UG">Degree Programme</option>
                           
                       <option key={2222} value="NCE">NCE Programme</option>
                 
                      
                        </select>
           <span className='text-danger'>{errors.category && touched.category && errors.category}</span>
           </div>
            <div className="form-group">
           <input
             type="text"
             name="address"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.address}
             className="form-control  form-control-user"
              placeholder="Address" 
        
           />
           <span className='text-danger'>{errors.address && touched.address && errors.address}</span>
           </div>
                        <div className="form-group">
               <label htmlFor="gender">Gender</label>
                     <select
                        type=""
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                    
                            
                       <option key={2323} value="M">MALE</option>
                       <option key={22222} value="F">FEMALE</option>
                 
                      
                        </select>
           <span className='text-danger'>{errors.gender && touched.gender && errors.gender}</span>
           </div>
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
          {/*
                // <div className="custom-control custom-checkbox small">
                //   <input type="checkbox" className="custom-control-input" id="customCheck" />
                //   <label className="custom-control-label" htmlFor="customCheck" >Remember Me</label>
                // </div>
          */}
              </div>
         
               <button type="submit" className="btn btn-danger btn-user btn-block disable_login"  disabled={this.state.isSubmitting}>
              {this.state.isSubmitting? 
                  <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                :'Register'}
              </button>
         </form>
       )}
     </Formik>
              <hr />
              <div className="text-center">
              <Link to='/auth/login' className="small  btn-link">
               Login here
              </Link>
            

              </div>
              </div>
          )
      }

    }



  




                  