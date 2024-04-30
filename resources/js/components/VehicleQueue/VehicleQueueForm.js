import React from 'react';
 import { Formik } from 'formik';
 import {Redirect} from 'react-router-dom'
 const VehicleQueueForm = (props) => (
   <div>

     <h1 className="h3 mb-12 text-gray-800">Vehicle Form</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={{ id:null ,departure_time:'',fare_id:'',vehicle_id:''}}
       validate={values => {
         const errors = {};
         if (!values.departure_time) {
           errors.departure_time = 'Required';
         } 
         if (!values.vehicle_id) {
          errors.vehicle_id = 'Required';
        } 
        
        //  else if (
        //    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //  ) {
        //    errors.departure_time = 'Invalid ema';
        //  }
         return errors;
       }}
    
       onSubmit={(values, { setSubmitting }) => {
        
         setSubmitting(!props.handleFormSubmit(values));
     

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
               <label htmlFor="vehicle_id">Vehicle </label>
           <select
             type="vehicle_id"
             name="vehicle_id"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.vehicle_id}
             className="form-control"
           >
             <option value="">Select </option>
             <option value="Active">Active</option>
             <option value="Old">Old</option>
           </select>
           <span className='text-danger'>{errors.vehicle_id && touched.vehicle_id && errors.vehicle_id}</span>
           </div>
           <div className="form-group">
               <label htmlFor="fare_id">Trip </label>
           <select
             type="fare_id"
             name="fare_id"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.fare_id}
             className="form-control"
           >
             <option value="">Select </option>
             <option value="Active">Active</option>
             <option value="Old">Old</option>
           </select>
           <span className='text-danger'>{errors.fare_id && touched.fare_id && errors.fare_id}</span>
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
 );
 
 export default VehicleQueueForm;