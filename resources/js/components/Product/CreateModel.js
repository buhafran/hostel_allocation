import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {getBrands,updateProductModel,createProductModel,getProductModel} from '../Actions';
import { Redirect } from 'react-router-dom';
    class CreateModel extends Component {
      constructor (props) {
        super(props)
        this.state = {
          brands:[],
          formsubmitted:false,
        componentsLoaded:false
        }
      }

      componentDidMount () {
       const id = this.props.match.params.id
       
       if(id && id!=='create')
       {
        getProductModel(id, (response)=>{
          console.log(response)
          this.setState({
            ...this.state,
            model:response.data,
            componentsLoaded:true
          })
        })

       }
       else
       {
        this.setState({
          ... this.state,
            model:{
              ModelName:'',
              brand_id:''
          },
          componentsLoaded:true
        })
       }

       getBrands(response=>{
        this.setState({
          ...this.state,
          brands:response.data.data
        })
       })


      }
submitForm(values){




  //return true;
}
      render () {
        const {formsubmitted } = this.state
       const parkId = this.props.match.params.id
        return (this.state.formsubmitted ? <Redirect to="/admin/product/models"/> :
          (this.state.componentsLoaded ?

          (
          <div>
                <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Create New Model</h6>
                </div>
                <div className="card-body">
                     <div>

     <h1 className="h3 mb-12 text-gray-800">Product Model</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={this.state.model}
       validate={values => {
         const errors = {};
         if (!values.ModelName) {
           errors.ModelName = 'Required';
         } 
        
         return errors;
       }}
    
       onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
        

            const id = this.props.match.params.id
             if(id && id!=='create')
             {
                updateProductModel(id,values, (response)=>{
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

                  createProductModel(values, (response)=> {

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
            <label htmlFor="ModelName">Model Name</label>
           <input
             type="text"
             name="ModelName"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.ModelName }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.ModelName && touched.ModelName && errors.ModelName}</span>
           </div>
           <div className="form-group">
               <label htmlFor="brand_id">Brand</label>
                     <select
                        type=""
                        name="brand_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.brand_id ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        {this.state.brands.map((role,index)=>{
                        return (<option key={index} value={role.id}>{role.BrandName} </option>)
                        })}>
                        </select>
           <span className='text-danger'>{errors.brand_id && touched.brand_id && errors.brand_id}</span>
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

    export default CreateModel