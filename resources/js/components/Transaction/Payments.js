import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import Body from '../Body'
import axios from 'axios';
import swal from 'sweetalert';
import {getPayments,deletePayment} from '../Actions';
export default class Payments extends Component{
  constructor() {
    super();
    this.state = {tabledata:[] };
  }

  getData(){
     var self= this;
  getPayments((response)=>{
      if(response)
      {
        self.setState({
          ... self.state,
          tabledata:response.data.data//.filter(function(it){ return it.payment_status===1})
        })
       
      }
        //console.log(response.data)
    }).then(function(){
      $('.dataTable').dataTable({
                 paging: false,
                dom: 'Bfrtip',
                buttons: [
                    {extend:'print',

                      title: '',
                      customize: function ( win ) {
                          $(win.document.body)
                              .css( 'font-size', '10pt' )
                              .prepend(
                                  '<center><img src="https://faabzlogistics.com/img/logo.png"/><br>'+ title +'<h1>FAABZ LOGISTICS</h1> </center> '
                              );
       
                          $(win.document.body).find( 'table' )
                              .addClass( 'compact' )
                              .css( 'font-size', 'inherit' );
                      }

                  },
                    'excel'
        ]
    });
    })
  }
  deleteItem(id){
    deletePayment(id,(response)=>{
      if(response.status==200)
      {
        swal("Success!", "Deleted Successfully", "success");
                this.setState({
          ...this.state,
          tabledata:this.state.tabledata.filter(function(item){ return item.id!==id})
        })
   
       
      } 
  })
  }
  componentDidMount(){
    this.getData()
  }
  onDelete(index) {

     var self= this;

    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this item",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
.then((willDelete) => {
  if (willDelete) {
  this.deleteItem(index)
  } else {
   // swal("Canceled Successfully");
  }
});


    
}
  render(){
    return (

      <div>
      <h1 className="h3 mb-12 text-gray-800">Payment List</h1>
      <div className="row">

        <div className="col-lg-12">
          
    <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">...</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
               <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Reference</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Discount</th>
                      <th>AmountDue</th>
                      <th>AmountPaid</th>
                      <th>Refund</th>
                      <th>Status</th>
                      <th>Payment Method</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Reference</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Discount</th>
                      <th>AmountDue</th>
                      <th>AmountPaid</th>
                      <th>Refund</th>
                      <th>Status</th>
                      <th>Payment Method</th>
                      <th>Date</th>
                      <th></th>

                    </tr>
                  </tfoot>
                  <tbody>
                {
                  this.state.tabledata.map((transactions, index) => {
                  var d= new Date(transactions.created_at);
                    var ds= `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
                    return (
                      <tr key={index}>
                       <td>{index+1}</td>
                        <td>{transactions.payment_reference}</td>
                        <td>{transactions.customer_name}</td>
                        <td>{transactions.customer_phone}</td>
                        <td>{transactions.order_discount}</td>
                        <td>{transactions.order_amount_due}</td>
                        <td>{transactions.amount_paid}</td>
                        <td>{transactions.refund}</td>
                        <td>{'--'}</td>
                        <td>{transactions.payment_metdod}</td>
                        <td>{ds}</td>
                        <td><Link to={`/home/transactions/${transactions.id}`} className="btn btn-datatable btn-icon btn-dark"><i class="fas fa-eye"></i>
</Link>
                           
                        <button type="button"  className="btn btn-datatable btn-icon btn-danger" onClick={()=>this.onDelete(transactions.id)} ><i className="fas fa-trash-alt"></i></button>
                        </td>
                
                      </tr>
                    );
                  })
                }
                  </tbody>
                  </table>
             </div>
            </div>
          </div>
          </div>
          </div>
          </div>


    )
  }
}