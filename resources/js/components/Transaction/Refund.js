import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import Body from '../Body'
import axios from 'axios';
import swal from 'sweetalert';
import {getRefunds,deleteRefund} from '../Actions';
export default class Refund extends Component{
  constructor() {
    super();
    this.state = {tabledata:[] };
  }

  getData(){
     var self= this;
  getRefunds((response)=>{
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
    deleteRefund(id,(response)=>{
    
      if(response.status)
      {
        swal("Success!", "Deleted Successfully", "success");
                this.setState({
          ...this.state,
          tabledata:this.state.tabledata.filter(function(item){ return item.id!==id})
        })
   
       
      } 
      else
      {
        swal("Error", response.message,'error')
      }
  })
  }
  componentDidMount(){
    this.getData()
  }
  onDelete(index) {

     var self= this;

    swal({
    title: "Are you sure ?",
    text: "Once deleted, you will not be able to recover this item",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
.then((willDelete) => {
  if (willDelete) {
  this.deleteItem(index)
  } else {
   //swal("Canceled Successfully");
  }
});


    
}
  render(){
    return (

      <div>
      <h1 className="h3 mb-12 text-gray-800">Refunds</h1>
      <div className="row">

        <div className="col-lg-12">
          
    <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary"> </h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
               <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                     <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Amount</th>
                            <th>reason</th>
                           
                
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Amount</th>
                          
                            <th>reason</th>
                           
                
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {
                            this.state.tabledata.map((park, index) => {
                              var d = new Date(park.created_at);
                              var ds = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{park.customer_name}</td>
                                  <td>{park.customer_phone}</td>
                                  <td>{park.refund_amount}</td>
                                  <td>{park.reason}</td>
                                  <td>{ds}</td>
                                  <td><Link className="btn btn-primary" to={`/admin/payment/refund/${park.id}`}>Edit</Link><button type="button" do='delete' key={`${park.id}`} className="btn btn-danger" onClick={()=> this.onDelete(park.id)}>Delete</button></td>

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