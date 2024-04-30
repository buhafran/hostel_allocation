 import axios from 'axios'
    import React, { Component } from 'react'
import {Formik} from 'formik'
import {getLoginUser,updateLoginUser,changeMyPassword} from '../Actions';
    class UserDetails extends Component {
      constructor (props) {
        super(props)
        this.state = {
          user:{
            name:"",
            email:"",
            category:""
          },
          categories:[{name:"Degree",key:"UG"},{name:"NCE",key:"NCE"}]
          
        }
      }
      handleChangePassword(values){

      }
      handleChangeDetails(values){

      }
      handleUpdateStudent(values){
        
      }

      componentDidMount () {
//const userId= this.props.match.params.id;
        getLoginUser((user)=>{
          if(user){
            this.setState({
              ...this.state,
              user:user
            })
          }
        })
        // const vehicleId = this.props.match.params.id

        // axios.get(`/api/vehicle/${vehicleId}`).then(response => {
        //   this.setState({
        //     vehicle: response.data,
        //    // tasks: response.data.tasks
        //   })
        // })
      }

      render () {
        const { project, tasks } = this.state
        const genders=[{key:'M', title:"Male"},{key:'F', title:"Female"}]
        const categories=[{key:'UG', title:"Undergraduate"},{key:'NCE', title:"NCE "}]
        return (
          <div>
           <h1 className="h3 mb-4 text-gray-800">User Profile</h1>

          <div className="row">

            <div className="col-lg-6">

      
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">User</h6>
                </div>
                <div className="card-body">
          
                <img src="data:image/png;base64,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" />
                  <div className="mb-2">
                    <code>{this.state.user.role}</code>
                  </div>
                 
                </div>
              </div>


              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Password</h6>
                </div>
                <div className="card-body">
                  <Formik
                    initialValues={{old_password:'','new_password':'','new_password_confirmation':''}}
                    validate={values => {
                    const errors = {};
                    if (!values.old_password) {
                    errors.old_password = 'Required';
                    }
                    if (!values.new_password) {
                    errors.new_password = 'Required';
                    }
                    if (!values.new_password_confirmation) {
                    errors.new_password_confirmation = 'Required';
                    }
                     if (values.new_password_confirmation!=values.new_password) {
                    errors.new_password_confirmation = 'Passwords must match';
                    }
                    
                    return errors;
                    }}
                    
                    onSubmit={(values, { resetForm,setSubmitting,setErrors}) => {
                    console.log(values)
                   // this.handleChangePassword(values);
                      changeMyPassword(values, res=>{
                       // console
                       if(res.errors)
                       {
                        setErrors(res.errors);
                       }
                        if(res.status)
                        {
                          swal('Success',res.message,'success')
                          resetForm();
                        }
                      } )
                    // setSubmitting(!props.handleFormSubmit(values));
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
                        <label htmlFor="old_password">Old Password</label>
                        <input
                        type="password"
                        name="old_password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.old_password}
                        className="form-control"
                        
                        />
                        <span className='text-danger'>{errors.old_password && touched.old_password && errors.old_password}</span>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="capacity">New Password</label>
                        <input
                        type="password"
                        name="new_password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.new_password}
                        className="form-control"
                        />
                        <span className='text-danger'>{errors.new_password && touched.new_password && errors.new_password }</span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="new_password_confirmation">Confirm New Password</label>
                        <input
                        type="password"
                        name="new_password_confirmation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.new_password_confirmation}
                        className="form-control"
                        />
                        <span className='text-danger'>{errors.new_password_confirmation && touched.new_password_confirmation && errors.new_password_confirmation }</span>
                      </div>
                      
                      
                      <button type="submit" className='btn btn-primary' disabled={this.state.isSubmitting}>
                      Change Password
                      </button>
                    </form>
                    )}
                  </Formik>
                </div>
              </div>

            </div>
                 <div className="col-lg-6">

      
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Details</h6>
                </div>
                <div className="card-body">
          
                <Formik
                  initialValues={this.state.user}
                  validate={values=> {
                  const errors = {};
               
              
                  if (!values.category) {
                 // errors.categorytt = 'Required';
                  
                  }
                  return errors;
                }}
                  
                  onSubmit={(values, { setSubmitting }) => {
                //  console.log(values);
                  // setSubmitting(!props.handleFormSubmit(values));
                  //this.handleUpdateStudent()
                  this.setState({
                    ...this.state,
                    isSubmitting:true
                  })
                    updateLoginUser(values, (res)=>{
                      console.log(res);
                      if(res.status)
                      {
                        swal('Success!', res.message, 'success');
                      }
                        this.setState({
                    ...this.state,
                    isSubmitting:false
                  })
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name || this.state.user.name}
                                            disabled={true}
                      className="form-control"
                      
                      />
                      <span className='text-danger'>{errors.name && touched.name && errors.name}</span>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="capacity">Email</label>
                      <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email || this.state.user.email}
                      disabled={true}
                      className="form-control"
                      />
                      <span className='text-danger'>{errors.email && touched.email && errors.email }</span>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        type=""
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category || this.state.user.category}
                        className="form-control"
                                              disabled={false}
                        >
                        <option value="">Select </option>
                        {categories.map((category,index)=>{
                        return (<option key={index} value={category.key}>{category.title} </option>)
                        })}
                        
                        
                      </select>
                      <span className='text-danger'>{errors.category && touched.category && errors.category}</span>
                    </div>
                            <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select
                        type=""
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender || this.state.user.gender}
                        className="form-control"
                                              disabled={false}
                        >
                        <option value="">Select Gender</option>
                        {genders.map((g,index)=>{
                        return (<option key={index} value={g.key}>{g.title} </option>)
                        })}
                        
                        
                      </select>
                      <span className='text-danger'>{errors.gender && touched.gender && errors.gender}</span>
                    </div>
                  

                      <button type="submit" className='btn btn-primary' disabled={this.state.isSubmitting}>
                      Save
                      </button>
                  </form>
                  )}
                </Formik>
                 
                </div>
              </div>



            </div>
         </div>
         </div>
        )
      }
    }

    export default UserDetails