 import axios from 'axios'
    import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getAcceptedOrders,deleteOrder} from '../Actions';
    class AcceptedOrder extends Component {
      constructor() {
        super();
        this.state = { tabledata: [] };
      }

      componentDidMount() {
        var self = this;
        getAcceptedOrders( response=> {
          //console.log(response)
            if (response) {
              self.setState({
                ...self.state,
                tabledata: response.data.data
              })

            }
            console.log(response.data)
          }).then(function () {
            $('.dataTable').dataTable();
          })
      }
    deleteItem(id){
    self=this;
    deleteFleet(id,(response)=>{
     // console.log(response);
      if(response)
      {
        swal("Success!", "Deleted Successfully", "success");
                this.setState({
          ...this.state,
          tabledata:this.state.tabledata.filter(function(item){ return item.id!==id})
        })
   
      } 
    })
    }

  onDelete(index) {
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

      render() {
        return (

          <div>
            <h1 className="h3 mb-12 text-gray-800">Accepted Orders</h1>
            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">_</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>OrderId</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Amount Due</th>
                            <th>Delivery Amount</th>
                            <th>Payment Method</th>
                            <th>Paid Amount</th>
                            <th>Order Status</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tfoot>
                        <tr>
                            <th>#</th>
                            <th>OrderId</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Amount Due</th>
                            <th>Delivery Amount</th>
                            <th>Payment Method</th>
                            <th>Paid Amount</th>
                            <th>Order Status</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {
                            this.state.tabledata.map((it, index) => {
                              var d = new Date(it.created_at);
                              var ds = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{it.OrderReference }</td>
                                  <td>{it.customer? it.customer.FirstName: '--'}</td>
                                  <td>{it.customer? it.customer.Phone : '--'}</td>
                                  <td>{it.AmountDue}</td>
                                  <td>{typeof(it.delivery)=='Object' ?? it.delivery.Cost  }</td>
                                  <td>{typeof(it.payment)=='Object' ?? it.payment.payment_method  }</td>
                                  <td>{typeof(it.payment)=='Object' ?? it.payment.amount_paid  }</td>
                                  <td>{it.Status}</td>
                                  <td>{ds}</td>
                                  <td>
                                  <Link className="btn btn-primary" to={`/admin/orders/${it.id}`}>View</Link></td>

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

    export default AcceptedOrder