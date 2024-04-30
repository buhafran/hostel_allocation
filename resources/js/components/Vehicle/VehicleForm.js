import React from 'react';
 import { Formik } from 'formik';
 import {Redirect} from 'react-router-dom'
 const VehicleForm = (props) => (
   <div>

     <h1 className="h3 mb-12 text-gray-800">Vehicle Form</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={{ id:null ,plate_number: '', description: '', capacity:'',owner_id: '', status: '' }}
       validate={values => {
         const errors = {};
         if (!values.plate_number) {
           errors.plate_number = 'Required';
         } 
         if (!values.description) {
          errors.description = 'Required';
        } 
        if (!values.capacity) {
          errors.capacity = 'Required';
        } 

        if (!values.status) {
          errors.status = 'Required';
        } 
        if (!values.owner_id) {
          errors.owner_id = 'Required';
        }
        //  else if (
        //    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //  ) {
        //    errors.plate_number = 'Invalid ema';
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
            <label htmlFor="plate_number">Plate Number</label>
           <input
             type="plate_number"
             name="plate_number"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.plate_number}
             className="form-control"
        
           />
           <span className='text-danger'>{errors.plate_number && touched.plate_number && errors.plate_number}</span>
           </div>
           <div className="form-group">
               <label htmlFor="description">Description</label>
           <input
             type="description"
             name="description"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.description}
             className="form-control"
           />
           <span className='text-danger'>{errors.description && touched.description && errors.description}</span>
           </div>
           <div className="form-group">
               <label htmlFor="capacity">Capacity</label>
           <input
             type="number"
             name="capacity"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.capacity}
             className="form-control"
           />
           <span className='text-danger'>{errors.capacity && touched.capacity && errors.capacity}</span>
           </div>
           <div className="form-group">
               <label htmlFor="status">Status</label>
           <select
             type="status"
             name="status"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.status}
             className="form-control"
           >
             <option value="">Select </option>
             <option value="Active">Active</option>
             <option value="Old">Old</option>
           </select>
           <span className='text-danger'>{errors.status && touched.status && errors.status}</span>
           </div>

           <div className="form-group">
               <label htmlFor="owner_id">OwnerShip</label>
           <select
             
             name="owner_id"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.owner_id}
             className="form-control"
           >
             <option value="">Select </option>
             <option value="1">Anyaloko Transport</option>
             
           </select>
           <span className='text-danger'>{errors.owner_id && touched.owner_id && errors.owner_id}</span>
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
 
 export default VehicleForm;