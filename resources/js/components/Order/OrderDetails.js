import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {getVendor,getOrder,getFleets,updateOrderItem,updateDelivery,createPayment,deletePayment,createRefund,
deleteRefund} from '../Actions';
import { Redirect,Link } from 'react-router-dom';
    class OrderDetails extends Component {
      constructor (props) {
        super(props);
        this.state = {
          order:{},
          fleets:[],
          formsubmitted:false,
        componentsLoaded:false,
        payment_methods:[{
          id:'cash',
          text:'Cash'
        },
        {
          id:'transfer',
          text:'Transfer'
        },
        {
          id:'pos',
          text:'POS'
        },
         {
          id:'online',
          text:'Online'
        }
        ]
        }
      }

      componentDidMount () {
       const id = this.props.match.params.id
       
       if(id)
       {
        getOrder(id, (response)=>{
         // console.log(response)
          this.setState({
            ...this.state,
            order:response.data,
            componentsLoaded:true
          })
        })  
        getFleets((response)=>{
            console.log(response)
          this.setState({
            ...this.state,
            fleets:response.data.data,
          })
        })

       }


      }
      acceptOrder(item_id)
      {
        const data={AvailableInStore:1};
        updateOrderItem(item_id,data,res=>{
          console.log(res)
          if(res.status)
          {
            const ind= this.state.order.items.findIndex((obj=>obj.id==item_id));
              let items= this.state.order.items
              items[ind].AvailableInStore=1;
            this.setState({
              ...this.state,
              order:{
                ...this.state.order,
                items:items
              }
            })
          }
        })
      }
      rejectOrder(item_id)
      {
        const data={AvailableInStore:0};
        updateOrderItem(item_id,data,res=>{
          console.log(res)
          if(res.status)
          {
            const ind= this.state.order.items.findIndex((obj=>obj.id==item_id));
              let items= this.state.order.items
              items[ind].AvailableInStore=0;
            this.setState({
              ...this.state,
              order:{
                ...this.state.order,
                items:items
              }
            })
          }
        })
      }
      deletePictureTrue(id){
        deleteOrderItem(id, res=>{
           if(res)
           {
              swal("Success!", "Deleted Successfully", "success");
                this.setState({
                  ...this.state,
                  order:{...this.state.product,
                          items:this.state.product.pictures.filter(function(item){ return item.id!==id})
                          }
        })
   
          } 
 
        })
      }
            deletePaymentTrue(id){
        deletePayment(id, res=>{
           if(res)
           {
              swal("Success!", "Deleted Successfully", "success");
                this.setState({
                  ...this.state,
                  order:{...this.state.order,
                          payments:this.state.order.payments.filter(function(item){ return item.id!==id})
                          }
        })
   
          } 
 
        })
      }
      deleteRefundTrue(id){
        deleteRefund(id, res=>{
           if(res)
           {
              swal("Success!", "Deleted Successfully", "success");
                this.setState({
                  ...this.state,
                  order:{...this.state.order,
                          refunds:this.state.order.refunds.filter(function(item){ return item.id!==id})
                          }
                        })
        
   }
 })
 }
     
      deletePict(id){
            swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this item",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      .then((willDelete) => {
        if (willDelete) {
         this.deletePictureTrue(id)
        } else {
         // swal("Canceled Successfully");
        }
          });  
      }
      deletePayment(id){
            swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this item",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      .then((willDelete) => {
        if (willDelete) {
         this.deletePaymentTrue(id)
        } else {
         // swal("Canceled Successfully");
        }
          });  
      }
      deleteRefund(id){
            swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this item",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      .then((willDelete) => {
        if (willDelete) {
         this.deleteRefundTrue(id)
        } else {
         // swal("Canceled Successfully");
        }
          });  
      }

        submitForm(values){

          var self= this;
          console.log(values);




          //return true;
        }
              render () {
        const {order } = this.state
      console.log("Order", order)
       const parkId = this.props.match.params.id
        return (this.state.formsubmitted ? <Redirect to="/admin/products"/> :
          (this.state.componentsLoaded ?

          (
          <div>
     
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">Order details       {
                           order.is_treated==1 ? <div className="badge badge-success badge-pill">Treated</div> :<div className="badge badge-primary ">Pending</div>
                         } </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="Description">Customer Name</label>
                                <p className="font-weight-bold">{order.customer ? order.customer.FirstName + ' ' + order.customer.LastName: '--'}</p>
                              </div>
                               <div className="form-group">
                                 <label htmlFor="Description">Phone</label>
                               <p className="font-weight-bold">{order.customer ? order.customer.Phone : '--'}</p>
                              </div>
                              <div className="form-group">
                                 <label htmlFor="Description">Email</label>
                                   <p className="font-weight-bold">{order.customer ? order.customer.EmailAddress : '--'}</p>
                              </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                    
                   
                            <label htmlFor="Description">Order ID</label>
                            <p className="font-weight-bold">{order.OrderReference}</p>
                          </div>
                          <div className="form-group">
                            <label htmlFor="Description">Amount Due</label>
                            <p className="font-weight-bold">{order.AmountDue}</p>
                          </div>
                          {
                            this.state.order.delivery ?
                              <div className="form-group">
                                <label htmlFor="Description">Address</label>
                                <p className="font-weight-bold">{this.state.order.delivery.street}</p>
                                <p className="font-weight-bold">{this.state.order.delivery.url}</p>
                              
                              </div>
                          :
                          <div></div>
                          }
               
                        {/*
                        */}
                        </div>
                        </div>
                      </div>
                    </div>
                
                      <div className="card shadow mb-4">
                        <div className="card-header py-3">
                          <h6 className="m-0 font-weight-bold text-primary">Items List</h6>
                        </div>
                        <div className="card-body">
                          <div>
                            <div className="row">
                              <div className="col-lg-12">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>SN </th>
                                      <th>Product </th>
                                      <th>Quantity</th>
                                      <th>Amount</th>
                                      <th>State</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.order.items ?
                                      
                                      this.state.order.items.map((it,index)=>{
                                        return (<tr key={index}><td>{index+1}</td>
                                          <td>{it.product_name} </td>
                                          <td>{it.Quantity} </td>
                                          <td>{it.Amount} </td>

                                          <td>   {it.AvailableInStore==1 ? <div className="badge badge-success badge-pill">Accepted</div> : it.AvailableInStore==0 ? <div className="badge badge-danger badge-pill">Rejected</div>: <div className="badge badge-primary badge-pill">New</div>} </td>
                                         <td>
                                         {
                                          it.AvailableInStore==1 ?
                                              <button onClick={()=>this.rejectOrder(it.id)} className="btn btn-red btn-icon" type="button" title="Remove Item"><i className="fas fa-trash"></i></button>
                                            :
                                             <button onClick={()=>this.acceptOrder(it.id)} className="btn btn-green btn-icon" type="button" title="Accept Order"><i className="fas fa-check"></i></button>
                                         }
                                         </td>
                                         </tr>)
                                      })
                                        :
                                        <p>No Products</p>

                                  }
                                </tbody>
                                <tfoot>
                              <tr>
                                     <th>SN </th>
                                      <th>Product </th>
                                      <th>Quantity</th>
                                      <th>Amount</th>
                                      <th>State</th>
                                      <th></th>
                              </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
          <div className="card shadow mb-4">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item">
    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Delivery</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Payments</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Refund</a>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">





            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Delivery </h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                   {/* 
                    <label htmlFor="Description">Order Status</label>
                   <p className="font-weight-bold pill">{order.state ?? order.state}</p> */}
                  </div>
                  <h5> Assign Delivery</h5>
                  <Formik
                    initialValues={this.state.order.delivery || {VehicleId:'', Cost:''}}
                    validate={values => {
                    const errors = {};
                    if (!values.VehicleId) {
                    errors.VehicleId = 'Required';
                    }
                    if (!values.Cost) {
                    errors.Cost = 'Required';
                    }
                    
                    return errors;
                    }}
                    
                    onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
                    
                    const id = this.props.match.params.id
                    
                    updateDelivery(id,values, (response)=>{
                    if(response)
                    {
                    if(response.errors)
                    {
                    setErrors(response.errors)
                    }
                    else
                    {
                    swal("Success!", "Updated Successfully", "success");
                    // this.setState({
                    //   ...this.state,
                    //   formsubmitted: true
                    // })
                    }
                    }
                    })
                    
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
                        <label htmlFor="Cost">Delivery Price</label>
                        <input
                        type="number"
                        step=".01"
                        name="Cost"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Cost }
                        className="form-control"
                        
                        />
                        <span className='text-danger'>{errors.Cost && touched.Cost && errors.Cost}</span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="Description">Staff/Fleet</label>
                        <select
                          type=""
                          name="VehicleId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.VehicleId ||'' }
                          className="form-control"
                          >
                          <option value="">Select </option>
                          {this.state.fleets.map((f,index)=>{
                          return (<option key={index} value={f.id}>{f.LicenseNumber } {f.driver ? f.driver.FirstName + ' ' +  f.driver.LastName + '-' + f.driver.PhoneNumber: 'No Driver Assigned'}</option> )
                          })}>
                        </select>
                        <span className='text-danger'>{errors.VehicleId && touched.VehicleId && errors.VehicleId}</span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="Description">Delivery Status</label>
                        <select
                          type=""
                          name="DeliveryStatus"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.DeliveryStatus ||'' }
                          className="form-control"
                          >
                          <option value="">Select </option>
                          {[{id:0,text:"Not Complete"},{id:1,text:"Complete"}].map((f,index)=>{
                          return (<option key={index} value={f.id}>{f.text }</option> )
                          })}>
                        </select>
                        <span className='text-danger'>{errors.DeliveryStatus && touched.DeliveryStatus && errors.DeliveryStatus}</span>
                      </div>
                      <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
                      Save
                      </button>
                    </form>
                    ) }
                  </Formik>
                  
                </div>
                <div className="col-sm-6">
                  
                </div>
              </div>
            </div>
          </div>
  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
<div className="container-fluid row">
  <div className="col-sm-3">
  <h4> Create Payment</h4>
       <Formik
                    initialValues={{payment_method:'',amount_paid:''}}
                    validate={values => {
                    const errors = {};
                    if (!values.payment_method) {
                    errors.payment_method = 'Required';
                    }
                    if (!values.amount_paid) {
                    errors.amount_paid = 'Required';
                    }
                    
                    return errors;
                    }}
                    
                    onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
                    
                    const id = this.props.match.params.id
                      const data= {
                        ...values,
                        order_id: id,
                      }
                    createPayment(data, (response)=>{
                    if(response)
                    {
                    if(response.errors)
                    {
                    setErrors(response.errors)
                    }
                    else
                    {
                    swal("Success!", "Added Successfully", "success");
                    this.setState({
                      ...this.state,
                      order:{
                        ...this.state.order,
                        payments:[
                        ...this.state.order.payments,
                        response.data
                        ]
                      }
                     // formsubmitted: true
                    })
                    }
                    }
                    })
                    
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
                        <label htmlFor="Cost">Amount</label>
                        <input
                        type="number"
                        step=".01"
                        name="amount_paid"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.amount_paid }
                        className="form-control"
                        
                        />
                        <span className='text-danger'>{errors.amount_paid && touched.amount_paid && errors.amount_paid}</span>
                      </div>

                        <div className="form-group">
                        <label htmlFor="Description">Payment Method</label>
                        <select
                          type=""
                          name="payment_method"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.payment_method}
                          className="form-control"
                          >
                          <option value="">Select </option>
                          {this.state.payment_methods.map((f,index)=>{
                          return (<option key={index} value={f.id}>{f.text }</option> )
                          })}>
                        </select>
                        <span className='text-danger'>{errors.payment_method && touched.payment_method && errors.payment_method}</span>
                      </div>
                      <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
                      Save
                      </button>
  </form>  
   ) }
                  </Formik>

  </div>  
  <div className="col-sm-9">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SN </th>
                        <th>PaymentRef </th>
                        <th>Payment Method</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.order.payments ?
                      
                      this.state.order.payments.map((it,index)=>{
                      return (<tr key={index}><td>{index+1}</td>
                      <td>{it.payment_reference} </td>
                      <td>{it.payment_method} </td>
                      <td>{it.amount_paid} </td>
                      <td>{it.created_at} </td>
                      <td>
                        <button onClick={()=>this.deletePayment(it.id)} className="btn btn-red btn-icon" type="button" title="Remove Item"><i className="fas fa-trash"></i></button>
                        
                      </td>
                    </tr>)
                    })
                    :
                    <p>No Payment</p>
                    }
                  </tbody>
                  <tfoot>
                  <tr>
                    <th>SN </th>
                    <th>PaymentRef </th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                  </tfoot>    
</table>
</div>
</div>
</div>
  <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
  <div className="container-fluid row">
  <div className="col-sm-3">
  <h4 className="text-danger"> Create Refund</h4>
       <Formik
                    initialValues={{reason:'',refund_amount:''}}
                    validate={values => {
                    const errors = {};
                    if (!values.refund_amount) {
                    errors.refund_amount = 'Required';
                    }
                    if (!values.reason) {
                    errors.reason = 'Required';
                    }
                    
                    return errors;
                    }}
                    
                    onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
                    
                    const id = this.props.match.params.id
                      const data= {
                        ...values,
                        order_id: id,
                      }
                    createRefund(data, (response)=>{
                    if(response)
                    {
                    if(response.errors)
                    {
                    setErrors(response.errors)
                    }
                    else
                    {
                    swal("Success!", "Added Successfully", "success");
 
                  this.setState({
                      ...this.state,
                      order:{
                        ...this.state.order,
                        refunds:[
                        ...this.state.order.refunds,
                        response.data
                        ]
                      }
                     // formsubmitted: true
                    })
                    }
                    }
                    })
                    
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
                        <label htmlFor="Cost">Amount</label>
                        <input
                        type="number"
                        step=".01"
                        name="refund_amount"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.refund_amount }
                        className="form-control"
                        
                        />
                        <span className='text-danger'>{errors.amount_paid && touched.amount_paid && errors.amount_paid}</span>
                      </div>

                        <div className="form-group">
                        <label htmlFor="Description">Reason</label>
                        <input
                          type=""
                          name="reason"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.reason}
                          className="form-control"
                          />

                        <span className='text-danger'>{errors.reason && touched.reason && errors.reason}</span>
                      </div>
                      <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
                      Save
                      </button>
  </form>  
   ) }
                  </Formik>

  </div>  
  <div className="col-sm-9">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SN </th>
                        <th>Reasons</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.order.refunds ?
                      
                      this.state.order.refunds.map((it,index)=>{
                      return (<tr key={index}><td>{index+1}</td>
                      <td>{it.reason} </td>
                      <td>{it.refund_amount} </td>
                      <td>{it.created_at} </td>
                      <td>
                        <button onClick={()=>this.deleteRefund(it.id)} className="btn btn-red btn-icon" type="button" title="Remove Item"><i className="fas fa-trash"></i></button>
                        
                      </td>
                    </tr>)
                    })
                    :
                    <p>No Refund</p>
                    }
                  </tbody>
                  <tfoot>
                  <tr>
                        <th>SN </th>
                        <th>Reasons</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th></th>
                  </tr>
                  </tfoot>    
</table>
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

    export default OrderDetails