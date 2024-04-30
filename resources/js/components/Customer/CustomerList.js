 import axios from 'axios'
    import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getCustomers,deleteCustomer} from '../Actions';
    class CustomerList extends Component {
      constructor() {
        super();
        this.state = { tabledata: [] };
      }

      componentDidMount() {

        getCustomers( response=> {
          console.log( response)
            if (response) {
              this.setState({
                ...this.state,
               tabledata: response.data
              })

            }
            
          }).then(function () {
            $('.dataTable').dataTable();
          })
      }
    deleteItem(id){

    deleteCustomer(id,(response)=>{
     // console.log(response);
      if(response.status)
      {
        swal("Success!", response.message , "success");
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
            <h1 className="h3 mb-12 text-gray-800">Customers List</h1>
            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary"></h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>PhoneNumber</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>State</th>
                            <th>Address</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                             <th>#</th>
                            <th>PhoneNumber</th>
                            <th>Email</th>
                            <th>Name</th>

                            <th>State</th>
                            <th>Address</th>
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
                                  <td>{park.Phone|| ""}</td>
                                  <td>{park.EmailAddress || ""}</td>
 
                                  <td>{park.FirstName} {park.LastName}</td>
                                  <td>{park.State}</td>
                                  <td>{park.Address || ""}</td>
                                  <td>{ds}</td>
                                  <td>
                                   {/* <Link className="btn btn-primary" to={`/admin/customers/${park.id}`}>Details</Link> */}
                                  <button type="button" do='delete' key={`${park.id}`} className="btn btn-datatable btn-icon btn-danger mr-2" onClick={()=> this.onDelete(park.id)}><i className="far fa-trash-alt"></i></button></td>

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

    export default CustomerList