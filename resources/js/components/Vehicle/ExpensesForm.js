import React from 'react';
 import { Formik } from 'formik';
 import {Redirect} from 'react-router-dom'

 const ExpensesForm = (props) => (
   <div>

     <h1 className="h3 mb-12 text-gray-800">Vehicle Form</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={{ id:null,vehicle_id:'', expense_type:'', description: '', amount:''}}
       validate={values => {
         const errors = {};
         if (!values.expense_type) {
           errors.expense_type = 'Required';
         } 
         if (!values.description) {
          errors.description = 'Required';
        } 
        if (!values.amount) {
          errors.amount = 'Required';
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
               <label htmlFor="expense_type">Expense Type</label>
           <select
             type="expense_type"
             name="expense_type"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.expense_type}
             className="form-control"
           >

             <option value="">Select </option>
             {
                 props.expenseTypes.map((et,index)=>{
                return (<option value={et.id} key={index}> {et.expense_name} -{et.description}</option>)
              })             
              }
            
           </select>
           <span className='text-danger'>{errors.expense_type && touched.expense_type && errors.expense_type}</span>
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
               <label htmlFor="amount">Amount</label>
           <input
             type="number"
             name="amount"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.amount}
             className="form-control"
           />
           <span className='text-danger'>{errors.amount && touched.amount && errors.amount}</span>
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
 
 export default ExpensesForm;