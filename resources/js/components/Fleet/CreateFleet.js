import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {getFleet,updateFleet,createFleet,getCategories,getDrivers} from '../Actions';
import { Redirect } from 'react-router-dom';
    class CreateFleet extends Component {
      constructor (props) {
        super(props);
        this.state = {
          drivers:[],
          fleetTypes:['Motorcycle','Tricycle','Bus','Truck'],
          formsubmitted:false,
        componentsLoaded:false
        }
      }

      componentDidMount () {
       const id = this.props.match.params.id
       
       if(id && id!=='create')
       {
        getFleet(id, (response)=>{
          console.log(response)
          this.setState({
            ...this.state,
            fleet:response.data,
            componentsLoaded:true
          })
        })

       }
       else
       {
        this.setState({
          ... this.state,
            fleet:{
              LicenseNumber:'',
              Odometer:'',
              Status:'',
              NetValue :'',
              DriverId :'',
              ExteriorColour :'',
              Brand :'',
              Model :'',
              FleetType :'',
              NetWeight :''
          },
          componentsLoaded:true
        })
       }
       getDrivers(response=>{
        this.setState({
          ...this.state,
          drivers:response.data.data
        })
       })
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
                  <h6 className="m-0 font-weight-bold text-primary"> Vehicle</h6>
                </div>
                <div className="card-body">
                     <div>

     <h1 className="h3 mb-12 text-gray-800">Fleet Form</h1>

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
                updateFleet(id,values, (response)=>{
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

                  createFleet(values, (response)=> {

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
            <label htmlFor="CategoryName">License Number</label>
           <input
             type="text"
             name="LicenseNumber"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.LicenseNumber }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.LicenseNumber && touched.LicenseNumber && errors.LicenseNumber}</span>
           </div>
           <div className="form-group">
            <label htmlFor="CategoryName">Odometer Reading</label>
           <input
             type="number"
             step=".01"
             name="Odometer"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.Odometer }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.Odometer && touched.Odometer && errors.Odometer}</span>
           </div>
            <div className="form-group">
            <label htmlFor="CategoryName">Net Value</label>
           <input
             type="text"
             name="NetValue"
              type="number"
             step=".01"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.NetValue }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.NetValue && touched.NetValue && errors.NetValue}</span>
           </div>
          <div className="form-group">
            <label htmlFor="Brand">Brand Name</label>
           <input
             type="text"
             name="Brand"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.Brand }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.Brand && touched.Brand && errors.Brand}</span>
           </div>
          <div className="form-group">
            <label htmlFor="Model">Model Name</label>
           <input
             type="text"
             name="Model"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.Model }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.Model && touched.Model && errors.Model}</span>
           </div>
               <div className="form-group">
            <label htmlFor="NetWeight">NetWeight (Kg)</label>
           <input
             type="text"
             name="NetWeight"
              type="number"
             step=".01"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.NetWeight }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.NetWeight && touched.NetWeight && errors.NetWeight}</span>
           </div>
          <div className="form-group">
            <label htmlFor="ExteriorColour">ExteriorColour</label>
           <input
             type="text"
             name="ExteriorColour"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.ExteriorColour }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.ExteriorColour && touched.ExteriorColour && errors.ExteriorColour}</span>
           </div>
           <div className="form-group">
               <label htmlFor="DriverId">Driver</label>
                     <select
                        type=""
                        name="DriverId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.DriverId ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        {this.state.drivers.map((role,index)=>{
                        return (<option key={index} value={role.id}>{role.FirstName} {role.LastName} </option>)
                        })}>
                        </select>
           <span className='text-danger'>{errors.DriverId && touched.DriverId && errors.DriverId}</span>
           </div>
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

    export default CreateFleet