import {Formik} from 'formik';
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
      import {Link } from 'react-router-dom'
      import Auth from './Auth';
      import { Redirect } from 'react-router-dom';
      import logo from '../Assets/img/jcoe_small.jpg';
      import {startNewRegistration,registrationStatusByRefOrRegno,getRegistrationServices} from "../Actions"
    //import { BrowserRouter, Route, Switch } from 'react-router-dom'

 export default class RegistrationPayment extends Component{
  constructor(){
    super();
    this.state={
      isSubmitting:false,
      error:"",
      success:"",
      isNew:false,
      services:[],
    }
  }
  componentDidMount()
  {
    getRegistrationServices(res=>{
      this.setState({
        ...this.state,
        services:res
      });
    })
  }
  handleCheckRegNumber(input)
  {
         this.setState({
          ...this.state,
          isSubmitting:true,
         
        })
  
    registrationStatusByRefOrRegno(input, (response)=>{
      console.log(response)
      if(response.status)
      {
     
        this.setState({
          ...this.state,
          isSubmitting:false,
          payref:response.data.transaction.trans_ref
        })
      }
      else
      {
          this.setState({
          ...this.state,
          isSubmitting:false,
          isNew:true,
        })
      }
    })
  }
    handleSubmit(values)
   {
   // console.log(values)
    this.setState({
      ... this.state,
      isSubmitting:true,
      success:"",
      error:"",
      payref:null
    })
  


    }
      render(){
        //this.state.success!==''
        return  this.state.payref ? ( <Redirect to={"/student/invoice/" + encodeURIComponent(this.state.payref)}/> ) :(
          <div>
              <div className="text-center">
                <img src={logo} style={{ height:'30px'}}/>
            {/*
            */}
                <h1 className="h4 text-gray-900 mb-4"><b>STUDENT REGISTRATION PAYMENT</b> <br/>
                <p className="alert alert-danger">
                You are required to provide correct information.
                </p>
                </h1>
                <span className="text-danger" role="alert" id="loginError">
                      {this.state.error}
                  <br />
                </span>
{this.state.success!==""?
                   <p className="alert alert-success" role="alert" id="">
                      {this.state.success}
                      <Link to="/auth/login">Start here</Link>
           
                </p>
                :                

                <span></span>
                }
              
              </div>


        <Formik
       initialValues={{ service_type: '',email: '', indegene: '', category: '', reg_no:'', phone:"",first_name:"",last_name:'', middle_name:''}}
       validate={values => {
         const errors = {};
         if (!values.service_type) {
           errors.service_type = 'Service Type is Required';
         }    

         if (!values.email) {
           errors.email = 'Email is Required';
         } 
           if (!values.first_name) {
           errors.first_name = 'Your first name is Required';
         }           
         if (!values.last_name) {
           errors.last_name = 'Your first name is Required';
         } 
            if (!values.reg_no) {
           errors.reg_no = 'Registration Number is Required';
         }
       if (!values.phone) {
           errors.phone = 'Phone Number is Required';
         } 
           if (!values.indegene) {
          errors.indegene = 'Indegene Field Required';
        } 
       if (!values.category) {
          errors.category = 'Category Field Required';
        } 
         return errors;
       }}
    
    onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
       
        
        //setSubmitting(!props.handleFormSubmit(values));
       /// console.log("Create Account", values)
        //this.handleSubmit(values);
       this.setState({
          ... this.state,
          isSubmitting:true,
          success:"",
          error:""
        })
                startNewRegistration(values, (response)=>{
console.log(response)
                 if(response)
                      { 
                        if(response.errors)
                        {
                            setErrors(response.errors)
                        }
                        else if(response.status)
                        {     
                           //swal("Success!", "Account Successfully ", "success");
                            this.setState({
                              ...this.state,
                              formsubmitted: true,
                              payref: response.data.transaction.trans_ref
                            })
                               resetForm();
                               this.setState({
                                  ... this.state,
                                  isSubmitting:false,
                                  success:"Account Created Sucessfully ",
                                  error:""
                                })
                           swal("Success!", response.message, "success");


                        }
                      }
                          
                        
                        else
                        {
                          this.setState({
                                  ... this.state,
                                  isSubmitting:false
                                
                                })

                           swal("Error!", "Server returned an error", "error");
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
               <label htmlFor="service_type"> Service type </label>
                     <select
                        type=""
                        name="service_type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.service_type || '' }
                        className="form-control"
                        >

                      <option value="">Select </option>
                      {this.state.services.map(d=>
                          <option key={233} value="{d.service_code}">{d.service_name}</option>
                      )}
                     
                 
                      
                        </select>
           <span className='text-danger'>{errors.service_type && touched.service_type && errors.service_type}</span>

           </div>
           <div className="form-group">

           <input
             type="text"
             name="reg_no"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.reg_no}
             className="form-control  form-control-user"
              placeholder="Registration Number" 
              //disabled={this.state.isNew}
        
           />
              <span className='text-danger'>{errors.reg_no && touched.reg_no && errors.reg_no}</span>
           </div>
        
{
  this.state.isNew?
  <div>
    

            <div className="form-group">

           <input
             type="text"
             name="first_name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.first_name}
             className="form-control  form-control-user"
              placeholder="First Name" 
        
           />
           <span className='text-danger'>{errors.first_name && touched.first_name && errors.first_name}</span>
           </div>
            <div className="form-group">

           <input
             type="text"
             name="last_name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.last_name}
             className="form-control  form-control-user"
              placeholder="Last Name" 
        
           />
           <span className='text-danger'>{errors.last_name && touched.last_name && errors.last_name}</span>
           </div>
        <div className="form-group">

           <input
             type="text"
             name="middle_name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.middle_name}
             className="form-control  form-control-user"
              placeholder="Middle Name" 
        
           />
           <span className='text-danger'>{errors.middle_name && touched.middle_name && errors.middle_name}</span>
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
               <label htmlFor="category"> Student Category </label>
                     <select
                        type=""
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                    
                       <option key={233} value="NCE">NCE</option>
                           
                       <option key={2222} value="UG">UG</option>
                 
                      
                        </select>
           <span className='text-danger'>{errors.category && touched.category && errors.category}</span>

           </div>
               <div className="form-group">
               <label htmlFor="category"> State of origin </label>
                     <select
                        type=""
                        name="indegene"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.indegene ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                    
                       <option key={233} value="0">Other (NON Indegene)</option>
                           
                       <option key={2222} value="1">Jigawa State (Indegene)</option>
                 
                      
                        </select>
           <span className='text-danger'>{errors.indegene && touched.indegene && errors.indegene}</span>
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
                :'Continue to payment'}
              </button>

                </div>
                :

               <button type="button" className="btn btn-primary btn-user btn-block disable_login" onClick={()=>this.handleCheckRegNumber(values.reg_no)}  disabled={this.state.isSubmitting}>Continue</button>
}
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



  




                  