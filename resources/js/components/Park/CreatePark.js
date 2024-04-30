import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {createPark,getPark,updatePark} from '../Actions';
import { Redirect } from 'react-router-dom';
    class CreatePark extends Component {
      constructor (props) {
        super(props)
        this.state = {
          formsubmitted:false,
        componentsLoaded:false
        }
      }

      componentDidMount () {
       const parkId = this.props.match.params.id
       
       if(parkId)
       {
        getPark(parkId, (response)=>{
          console.log(response)
          this.setState({
            ...this.state,
            park:response,
            componentsLoaded:true
          })
        })

       }
       else
       {
        this.setState({
          ... this.state,
            park:{
              name:'',
              address:'',
              state:''
          },
          componentsLoaded:true
        })
       }

        // axios.get(`/api/vehicle/${vehicleId}`).then(response => {
        //   this.setState({
        //     vehicle: response.data,
        //    // tasks: response.data.tasks
        //   })
        // })
      }
submitForm(values){
  //console.log(JSON.stringify(values, null, 2));
  var self= this;
  console.log(values);




  //return true;
}
      render () {
        const {formsubmitted } = this.state
       const parkId = this.props.match.params.id
        return (this.state.formsubmitted ? <Redirect to="/home/parks"/> :
          (this.state.componentsLoaded ?

          (
          <div>
                <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Create New Park</h6>
                </div>
                <div className="card-body">
                     <div>

     <h1 className="h3 mb-12 text-gray-800">Park Form</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={this.state.park}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         } 
         if (!values.state) {
          errors.state = 'Required';
        } 
        if (!values.address) {
          errors.address = 'Required';
        } 

         return errors;
       }}
    
       onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
        

            const parkId = this.props.match.params.id
            console.log(parkId)
             if(parkId)
             {
                updatePark(parkId,values, (response)=>{
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
                  createPark(values, (response)=> {
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
            <label htmlFor="name">Name</label>
           <input
             type="text"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.name && touched.name && errors.name}</span>
           </div>
           <div className="form-group">
               <label htmlFor="state">State</label>
           <input
             type="text"
             name="state"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.state }
             className="form-control"
           />
           <span className='text-danger'>{errors.state && touched.state && errors.state}</span>
           </div>
           <div className="form-group">
               <label htmlFor="address">Address</label>
           <input
             type="text"
             name="address"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.address}
             className="form-control"
           />
           <span className='text-danger'>{errors.address && touched.address && errors.address}</span>
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

    export default CreatePark