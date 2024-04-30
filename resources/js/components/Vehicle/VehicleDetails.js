import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import swal from 'sweetalert';
import {getVehicle} from "../Actions"
    class VehicleDetails extends Component {
  
      constructor (props) {
        super(props)
        this.state = {
          vehicle: {expenses:[],loadings:[]},
          drivers: [],
          totalExpenses:0
        }
      }
 deleteItem(id){
    self=this;
    axios.delete(`/api/vehicle_expense/${id}`)
    .then(function(response){

      if(response.status==200)
      {
        swal("Success!", "Deleted Successfully", "success");
                self.setState({
          ...self.state,
          vehicle:{
            ...self.state.vehicle,
              expenses:self.state.vehicle.expenses.filter(function(item){ return item.id!==id})
            }
        })
   
       //$('.dataTable').dataTable({paging: false});
      } 
  })
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
      componentDidMount () {
        const vehicleId = this.props.match.params.id;

        getVehicle(vehicleId, (response)=>{
          // /console.log(response);
          if(response)
          {
            this.setState({
            ...this.state,
            vehicle:{... response}
            });
            console.log(this.state);
          }
        }).then(function(){
                  $('.dataTable').dataTable({paging: false});
        })

       

      }

      render () {
        var total=0;
        const { vehicle } = this.state
      //  console.log(this.state.vehicle.loadings)
        return (

          
          <div className="row">
          <h1 className="h3 mb-12 text-gray-800"> {vehicle.plate_number}</h1>

            <div className="col-lg-12">
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-sm-12'>
                <div className='card'>
                  {/* <div className='card-header'>{vehicle.name}</div> */}
                  <div className='card-body'>
              
                    <h3>{vehicle.description}</h3>
                    <button className='btn btn-primary btn-sm'>
                      
                    </button>

                    <hr />

                    <ul className='list-group mt-3'>

                      {/* {tasks.map(task => (
                        <li
                          className='list-group-item d-flex justify-content-between align-items-center'
                          key={task.id}
                        >
                          {vehicle.name}

                          <button className='btn btn-primary btn-sm'>
                            Mark as completed
                          </button>
                        </li>
                      ))} */}

                    </ul>

                       <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active" id="home-tab" data-toggle="tab" href="#loading" role="tab" aria-controls="loadings" aria-selected="true">Loadings</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="profile-tab" data-toggle="tab" href="#expenses" role="tab" aria-controls="expenses" aria-selected="false">Expenses</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">...</a>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="loading" role="tabpanel" aria-labelledby="home-tab">...
                                    <div>
                              <div className="table-responsive">
                                <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Source</th>
                                      <th>Destination</th>
                                      <th>Loading</th>
                                      <th>Journey</th>
                                      <th>Fare Rate</th>
                                      <th>Percengers</th>
                                      <th>Created</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  
                                  <tbody>
                                    {
                                    vehicle.loadings.map((exp, index) => {
                                    var d= new Date(exp.created_at);
                                    var ds= `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
                                  // total+=exp.amount;
                                    return (
                                    <tr key={index}>
                                      <th>{index+1}</th>
                                      <th>{exp.source.name}</th>
                                      <th>{exp.destination.name}</th>
                                      <th>{exp.booking_complete==1? "Loading Complete":"--"}</th>
                                      <th>{exp.journey_complete==1? "Journey Complete":"--"}</th>
                                      <th>{exp.price}</th>
                                      <th>{"--"}</th>
                                      <th>{ds}</th>
                                      
                                      <th><button type="button"  className="btn btn-danger" onClick={()=>this.onDelete(exp.id)} >Delete</button></th>
                                      
                                    </tr>
                                    );
                                    })
                                    }
                                  </tbody>
                                  <tfoot>
                                  <tr>
                                      <th>#</th>
                                      <th>Source</th>
                                      <th>Destination</th>
                                       <th>Loading</th>
                                      <th>Journey</th>
                                      <th>Fare Rate</th>
                                      <th>Percengers</th>
                                      <th>Created</th>
                                      <th></th>
                                  </tr>
                                  </tfoot>
                                </table>
                              </div>
                              </div>


                        </div>
                        <div className="tab-pane fade" id="expenses" role="tabpanel" aria-labelledby="profile-tab">
                        <Link className='btn btn-primary btn-sm' to={`/home/vehicles/${vehicle.id}/new_expenses`}>New Expenses</Link>  
                           <div>
                              <div className="table-responsive">
                                <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Type</th>
                                      <th>Description</th>
                                      <th>Amount</th>
                                      <th>Created</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  
                                  <tbody>
                                    {
                                    vehicle.expenses.map((exp, index) => {
                                    var d= new Date(exp.created_at);
                                    var ds= `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
                                    total+=exp.amount;
                                    return (
                                    <tr key={index}>
                                      <th>{index+1}</th>
                                      <th>{exp.type ? exp.type.expense_name: ""}</th>
                                      <th>{exp.description}</th>
                                      <th>{exp.amount}</th>
                                      <th>{ds}</th>
                                      
                                      <th><button type="button"  className="btn btn-danger" onClick={()=>this.onDelete(exp.id)} >Delete</button></th>
                                      
                                    </tr>
                                    );
                                    })
                                    }
                                  </tbody>
                                  <tfoot>
                                  <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>{total}</th>
                                    <th>Created</th>
                                    <th></th>
                                  </tr>
                                  </tfoot>
                                </table>
                              </div>
                              </div>
                              ...</div>
                              <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                              </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        )
      }
    }

    export default VehicleDetails