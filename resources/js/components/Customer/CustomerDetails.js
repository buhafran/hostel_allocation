import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {getCustomer,updateCustomer,createFleet,getCategories} from '../Actions';
import { Redirect } from 'react-router-dom';
    class CustomerDetails extends Component {
      constructor (props) {
        super(props);
        this.state = {
          customer:{},
          fleetTypes:['Motorcycle','Tricycle','Bus','Truck'],
          formsubmitted:false,
        componentsLoaded:false
        }
      }

      componentDidMount () {
       const id = this.props.match.params.id
       
       if(id )
       {
        getCustomer(id, (response)=>{
          console.log(response)
          this.setState({
            ...this.state,
            customer:response.data,
            componentsLoaded:true
          })
        })

       }
       
       // else
       //  this.setState({
       //    ... this.state,
       //      fleet:{
       //        LicenseNumber:'',
       //        Odometer:'',
       //        Status:'',
       //        NetValue :'',
       //        DriverId :'',
       //        ExteriorColour :'',
       //        Brand :'',
       //        Model :'',
       //        FleetType :'',
       //        NetWeight :''
       //    },
       //    componentsLoaded:true
       //  })
       // }

       getCategories(response=>{
        this.setState({
          ...this.state,
          categories:response.data.data
        })
       })

      }
submitForm(values){

  var self= this;
  console.log(values);




  //return true;
}
      render () {
        const {formsubmitted } = this.state
       const parkId = this.props.match.params.id
        return (this.state.formsubmitted ? <Redirect to="/admin/fleets"/> :
          (this.state.componentsLoaded ?

          (
          <div>
                <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary"> Customer</h6>
                </div>
                <div className="card-body">
                     <div>

     <h1 className="h3 mb-12 text-gray-800">Customer Details</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={this.state.fleet}
       validate={values => {
         const errors = {};
          if (!values.LicenseNumber) {
           errors.LicenseNumber = 'Required';
         } 
         if (!values.Odometer) {
           errors.Odometer = 'Required';
         } 
          if (!values.Status) {
           errors.Status = 'Required';
         } 
            if (!values.FleetType) {
           errors.FleetType = 'Required';
         } 
        
         return errors;
       }}
    
       onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
        

            const id = this.props.match.params.id
             if(id && id!=='create')
             {
                updateCustomer(id,values, (response)=>{
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
         <div className="row">
         <div className="col-sm-6"> 
            <div className="form-group">
            <label htmlFor="CategoryName">First Name</label>
           <input
             type="text"
             name="FirstName"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.FirstName }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.FirstName && touched.FirstName && errors.FirstName}</span>
           </div>
          <div className="form-group">
            <label htmlFor="LastName">Last Name</label>
           <input
             type="text"
             name="LastName"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.LastName }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.LastName && touched.LastName && errors.LastName}</span>
           </div>
           <div className="form-group">
            <label htmlFor="Email">EmailAddress</label>
           <input
             type="text"
             name="EmailAddress"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.EmailAddress }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.EmailAddress && touched.EmailAddress && errors.EmailAddress}</span>
           </div>
          <div className="form-group">
            <label htmlFor="Email">Phone</label>
           <input
             type="text"
             name="Phone"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.Phone }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.Phone && touched.Phone && errors.Phone}</span>
           </div>

           </div>
            <div className="col-sm-6"> 




            <div className="form-group">
               <label htmlFor="FleetType">Vehicle Type</label>
                     <select
                        type=""
                        name="FleetType"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.FleetType ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        {this.state.fleetTypes.map((role,index)=>{
                        return (<option key={index} value={role}>{role}</option>)
                        })}>
                        </select>
           <span className='text-danger'>{errors.FleetType && touched.FleetType && errors.FleetType}</span>
           </div>
            <div className="form-group">
               <label htmlFor="Status">Status</label>
                     <select
                        type=""
                        name="Status"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Status ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        {['Active','Deprecated'].map((role,index)=>{
                        return (<option key={index} value={role}>{role}</option>)
                        })}>
                        </select>
           <span className='text-danger'>{errors.Status && touched.Status && errors.Status}</span>
           </div>
           
          
            
           <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
             Save
           </button>
</div>
</div>
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

    export default CustomerDetails