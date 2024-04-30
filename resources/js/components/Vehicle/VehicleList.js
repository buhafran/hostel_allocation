import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import Body from '../Body'
import axios from 'axios';
import swal from 'sweetalert';
import {getVehicles,postRequest,deletRequest,putRequest} from '../Actions';

export default class VehicleList extends Component{
  constructor() {
    super();
    this.state = {tabledata:[] };
  }

  getData(){
     var self= this;
     let dt=$('.dataTable');
    getVehicles(function(data){
    if(data){
      self.setState({
          ...self.state,
          tabledata:data.data
        })
    }
    })
    .then(function(){

      dt.dataTable({paging: false});
    })
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
          tabledata:self.state.tabledata.filter(function(item){ return item.id!==id})
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
      <h1 className="h3 mb-12 text-gray-800">Vehicle List</h1>
      <div className="row">

        <div className="col-lg-12">
          
		<div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary"><Link to='/home/vehicle/new' className="btn btn-primary">New</Link></h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
               <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Licence</th>
                      <th>Description</th>
                      <th>Capacity</th>
                      <th>Owner</th>
                      <th>Driver</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Licence</th>
                      <th>Description</th>
                      <th>Capacity</th>
                      <th>Owner</th>
                      <th>Driver</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th></th>
                    </tr>
                  </tfoot>
                  <tbody>
                {
                  this.state.tabledata.map((vehicle, index) => {
                  var d= new Date(vehicle.created_at);
                    var ds= `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
                    return (
                      <tr key={index}>
                       <th>{index+1}</th>
                        <th>{vehicle.plate_number}</th>
                        <th>{vehicle.description}</th>
                        <th>{vehicle.capacity}</th>
                        <th>{vehicle.owner.name}</th>
                        <th>{vehicle.driver? vehicle.driver.full_name || "" : ""}</th>
                        <th>{vehicle.status}</th>
                        <th>{ds}</th>
                        <th><Link to={`/home/vehicles/${vehicle.id}`}>View</Link><button type="button"  className="btn btn-danger" onClick={()=>this.onDelete(vehicle.id)} >Delete</button></th>
                
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