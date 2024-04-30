import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {createBrand,getBrand,updateBrand} from '../Actions';
import { Redirect } from 'react-router-dom';
    class CreateBrand extends Component {
      constructor (props) {
        super(props)
        this.state = {
          formsubmitted:false,
        componentsLoaded:false
        }
      }

      componentDidMount () {
       const id = this.props.match.params.id
       
       if(id && id!=='create')
       {
        getBrand(id, (response)=>{
          console.log(response)
          this.setState({
            ...this.state,
            brand:response.data,
            componentsLoaded:true
          })
        })

       }
       else
       {
        this.setState({
          ... this.state,
            brand:{
              BrandName:''
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
        return (this.state.formsubmitted ? <Redirect to="/admin/product/brands"/> :
          (this.state.componentsLoaded ?

          (
          <div>
                <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Create New  Brand</h6>
                </div>
                <div className="card-body">
                     <div>

     <h1 className="h3 mb-12 text-gray-800">Brand Form</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={this.state.brand}
       validate={values => {
         const errors = {};
         if (!values.BrandName) {
           errors.BrandName = 'Required';
         } 
    
         return errors;
       }}
    
       onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
        

            const id = this.props.match.params.id
           // console.log(id)
             if(id && id!=='create')
             {
                updateBrand(id,values, (response)=>{
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
                  createBrand(values, (response)=> {
                   // console.log(response);
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
            <label htmlFor="BrandName">BrandName</label>
           <input
             type="text"
             name="BrandName"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.BrandName }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.BrandName && touched.BrandName && errors.BrandName}</span>
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

    export default CreateBrand