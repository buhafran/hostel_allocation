 import axios from 'axios'
    import React, { Component } from 'react'
import {Formik} from 'formik'
import {createUser} from '../Actions';
import {Redirect} from 'react-router-dom';
    class CreateUser extends Component {
      constructor (props) {
        super(props)
        this.state = {
          formSubmitted:false,
          userId:0,
          user:{
            name:"",
            email:"",
            role:"",
            password:""
          },
          roles:["Administrator","Staff","Driver","Rider"]
          
        }
      }


      componentDidMount () {


      }
      handleFormSubmitted(newUser){
        this.setState({
          ...this.state,
          formSubmitted:true,
          userId:newUser.id
        })
      }

      render () {
        const { user,formSubmitted,roles } = this.state

        return ( formSubmitted? ( <Redirect to={`/admin/users/${this.state.userId}`}/> ):(
          <div>
           <h1 className="h3 mb-4 text-gray-800">Create New User</h1>

          <div className="row">

                 <div className="col-lg-6">

      
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Basic</h6>
                </div>
                <div className="card-body">
          
                <Formik
                  initialValues={user}                
                     validate={values => {
                           const errors = {};
                           if (!values.name) {
                             errors.name = 'Required';
                           } 
                           if (!values.email) {
                            errors.email = 'Required';
                          } 
                          if (!values.role) {
                            errors.role = 'Required';
                          } 

                          if (!values.password) {
                            errors.password = 'Required';
                          } 
                          //  else if (
                          //    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                          //  ) {
                          //    errors.plate_number = 'Invalid ema';
                          //  }
                           return errors;
                         }}
                  onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
                  //console.log(values);

                    createUser(values,(res)=>{
                        console.log(res)
                      if(!res.errors)
                      {
                         resetForm({})
                         swal("Success!", "Created Successfully", "success");
                         this.handleFormSubmitted(res)
                      }
                      else
                      {
                        setErrors(res.errors);
                        setSubmitting(false)
                      }
                    })

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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className="form-control"
                      
                      />
                      <span className='text-danger'>{errors.name && touched.name && errors.name}</span>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    className="form-control"
                      />
                      <span className='text-danger'>{errors.email && touched.email && errors.email }</span>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <select
                        type=""
                        name="role"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.role}
                        className="form-control"
                        >
                        <option value="">Select </option>
                        {roles.map((role,index)=>{
                        return (<option key={index} value={role}>{role} </option>)
                        })}
                        
                        
                      </select>
                      <span className='text-danger'>{errors.role && touched.role && errors.role}</span>
                    </div>
                        <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    className="form-control"
                      />
                      <span className='text-danger'>{errors.password && touched.password && errors.password }</span>
                    </div>
                    
                    <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
                    Save
                    </button>
                  </form>
                  )}
                </Formik>
                 
                </div>
              </div>



            </div>
         </div>
         </div>)
        )
      }
    }

    export default CreateUser