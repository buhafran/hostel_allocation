import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {updateVendor,createVendor,getVendor} from '../Actions';
import { Redirect } from 'react-router-dom';
    class CreateVendor extends Component {
      constructor (props) {
        super(props);
        this.state = {
          brands:[],
          categories:[],
          vendors:[],
          formsubmitted:false,
        componentsLoaded:false
        }
      }

      componentDidMount () {
       const id = this.props.match.params.id
       
       if(id && id!=='create')
       {
        getVendor(id, (response)=>{
          console.log(response)
          this.setState({
            ...this.state,
            vendor:response.data,
            componentsLoaded:true
          })
        })

       }
       else
       {
        this.setState({
          ... this.state,
            vendor:{
              VendorTag:'',
              Name:'',
              Address:'',
              EmailAddress :'',
              PhoneNumber :'',
              IsCompany :'',
          },
          componentsLoaded:true
        })
       }



      }
submitForm(values){



  //return true;
}
      render () {
        const {formsubmitted } = this.state
       const parkId = this.props.match.params.id
        return (this.state.formsubmitted ? <Redirect to="/admin/vendors"/> :
          (this.state.componentsLoaded ?

          (
          <div>
                <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Create Vendor</h6>
                </div>
                <div className="card-body">
                     <div>

     <h1 className="h3 mb-12 text-gray-800">Vendor  Form</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={this.state.vendor}
       validate={values => {
         const errors = {};
          if (!values.VendorTag) {
           errors.VendorTag = 'Required';
         } 
         if (!values.Name) {
           errors.Name = 'Required';
         } 
          if (!values.EmailAddress  ) {
           errors.EmailAddress  = 'Required';
         } 
            if (!values.PhoneNumber) {
           errors.PhoneNumber = 'Required';
         } 
    
        
         return errors;
       }}
    
       onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
        

            const id = this.props.match.params.id
             if(id && id!=='create')
             {
                updateVendor(id,values, (response)=>{
                 if(response)
                      { 
                        if(response.errors)
                        {
                            setErrors(response.errors)
                        }
                        else
                        {     
                           swal("Success!", "Updated Successfully", "success");
                            this.setState({
                              ...this.state,
                              formsubmitted: true
                            })
                          }
                        }
                })
             }
              else
              {

                  createVendor(values, (response)=> {

                      if(response)
                      { 
                        if(response.errors)
                        {
                            setErrors(response.errors)
                        }
                        else
                        {     
                           swal("Success!", "Created Successfully", "success");
                            this.setState({
                              ...this.state,
                              formsubmitted: true
                            })
                          }
                        }
                  //  console.log(response)
                  })
             }


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
            <label htmlFor="VendorTag">Vendor ID</label>
           <input
             type="text"
             name="VendorTag"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.VendorTag }
             className="form-control"
        
           />
           <span classVendorTag='text-danger'>{errors.VendorTag && touched.VendorTag && errors.VendorTag}</span>
           </div>
           <div className="form-group">
            <label htmlFor="Name"> Name</label>
           <input
             type="text"
             name="Name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.Name }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.Name && touched.Name && errors.Name}</span>
           </div>
            <div className="form-group">
            <label htmlFor="Address">Address</label>
           <input
             type="text"
             name="Address"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.Address }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.Address && touched.Address && errors.Address}</span>
           </div>
          <div className="form-group">
            <label htmlFor="EmailAddress">EmailAddress</label>
           <input
             type="email"
             name="EmailAddress"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.EmailAddress }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.EmailAddress && touched.EmailAddress && errors.EmailAddress}</span>
           </div>
          <div className="form-group">
            <label htmlFor="PhoneNumber">Phone Number</label>
           <input
             type="text"
             name="PhoneNumber"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.PhoneNumber }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.PhoneNumber && touched.PhoneNumber && errors.PhoneNumber}</span>
          </div>

            <div className="form-group">
                      <label htmlFor="IsCompany">Is Company</label>
                      <select
                        type=""
                        name="IsCompany"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.IsCompany}
                        className="form-control"
                                                                   >
                        <option value="">Select </option>
                        <option value="1">Yes </option>
                        <option value="0">No </option>
                        
                        
                      </select>
                      <span className='text-danger'>{errors.IsCompany && touched.IsCompany && errors.IsCompany}</span>
                    </div>
           
          
            
           <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
             Save
           </button>
         </form>
       ) }
     </Formik>
   </div>
   </div>
   </div>
                </div>
              </div>

          
         </div>
        ): '')
)
      }
    }

    export default CreateVendor