 import axios from 'axios'
    import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getRegTransactions} from '../Actions/admin';
    class RegTransactions extends Component {
      constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { 
          submitting:false,
          tabledata: [], start_date:"", end_date:"" };
      }

      handleSubmit()
      {
        // var self = this;
        event.preventDefault();
        this.setState({
          ...this.setState(),
          submitting:true,
          tabledata:[]

        })
        const filter= {
          start_date:this.state.start_date,
          end_date:this.state.end_date
        }
        console.log(filter)
        getRegTransactions(filter, response=> {
          console.log(response)
            if (response) {
              this.setState({
                ...self.state,
                submitting:false,
                tabledata: response.registration.data
              })

            }
            console.log(response.data)
          }).then(function () {
                    $('.dataTable').dataTable({
                  dom: 'Bfrtip',
                  buttons: [
                      'print','excel',
                      // {
                      //     text: 'Filter',
                      //     action: function ( e, dt, node, config ) {
                      //        //alert( 'Button activated' );
                      //     }
                      // }
                  ]
              });

          })
        //  this.setState({
        //   ...this.state,
        //   submitting:false,


        // })
      }
      handleChange(event) {   
        
       this.setState({
        ...this.state,
        [event.target.name]: event.target.value}); 
     }

      componentDidMount() {

      }


    deleteItem(id){
    self=this;
    // deleteProduct(id,(response)=>{
    //  // console.log(response);
    //   if(response)
    //   {
    //     swal("Success!", "Deleted Successfully", "success");
    //             this.setState({
    //       ...this.state,
    //       tabledata:this.state.tabledata.filter(function(item){ return item.id!==id})
    //     })
   
    //   } 
    // })
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
            <h1 className="h3 mb-12 text-gray-800">Registration Payments</h1>
            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
        
      <form className="form-inline" onSubmit={this.handleSubmit}>
      <div>
      <label>FROM</label>
      <input type="date" name="start_date" onChange={this.handleChange} value={this.state.start_date} />
      </div>
        <div>
      <label>TO</label>
  <input type="date" name="end_date" onChange={this.handleChange} value={this.state.end_date} />
    </div>

        <div>
      <label><br /> </label>
  <button className="btn btn-sm btn-primary">  Apply</button>
        </div>
</form>
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">
                  Alerts Center
                </h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                   
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-success">
                      <i className="fas fa-donate text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 7, 2020</div>
                    Filters
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-warning">
                      <i className="fas fa-exclamation-triangle text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 2, 2020</div>
                    Alert
                  </div>

                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>

              </div>
                  </div>
                  <div className="card-body">
                  {this.state.submitting? <p className="alert alert-info">Please Wait ..... loading</p>:""}
                    <div className="table-responsive">

                      <table className="table table-bordered table-hover compact dataTable" id="dataTable" width="100%" cellSpacing="0" style={{fontSize:'12px'}}>
                        <thead>
                                  <tr>
                            <th>#</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Phone</th>
                            <th>Reg No</th>
                            <th>TransactionID</th>
                            <th>Description</th>
                            <th>Amount Due</th>
                            <th>Amount Paid</th>
                            <th>Category</th>
                            <th>PaymentDate</th>
                
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>#</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Phone</th>
                            <th>Reg No</th>
                            <th>TransactionID</th>
                            <th>Description</th>
                            <th>Amount Due</th>
                            <th>Amount Paid</th>
                            <th>Category</th>
                            <th>PaymentDate</th>
                
                          </tr>
                        </tfoot>
                        <tbody>
                          {
                            this.state.tabledata.map((park, index) => {
                              var d = new Date(park.payment_date);
                              var ds = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{park.name}</td>
                                  <td>{park.email}</td>
                                  <td>{park.phone}</td>
                                  <td>{park.registration_number}</td>
                                  <td>{park.trans_ref}</td>
                                  <td>{park.description}</td>
                                  <td>{park.amount_due}</td>
                                  <td>{park.amount_paid}</td>
                                  <td>{park.category}</td>

                                  <td>{ds}</td>


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

    export default RegTransactions 