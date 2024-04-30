 import axios from 'axios'
    import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getParks,deletePark} from '../Actions';
    class ParksList extends Component {
      constructor() {
        super();
        this.state = { tabledata: [] };
      }

      componentDidMount() {
        var self = this;
        getParks( response=> {
          //console.log(response)
            if (response) {
              self.setState({
                ...self.state,
                tabledata: response.data
              })

            }
            console.log(response.data)
          }).then(function () {
            $('.dataTable').dataTable();
          }).catch(function (error) {
            //console.log(error);
          });
      }
    deleteItem(id){
    self=this;
    deletePark(id,(response)=>{
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
            <h1 className="h3 mb-12 text-gray-800">Park List</h1>
            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary"><Link to='/home/park/new' className="btn btn-primary">New</Link></h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>#</th>
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
                                  <th>{index + 1}</th>
                                  <th>{park.name}</th>
                                  <th>{park.state}</th>
                                  <th>{park.address}</th>
                                  <th>{ds}</th>
                                  <th><Link className="btn btn-primary" to={`/home/parks/${park.id}`}>Edit</Link><button type="button" do='delete' key={`${park.id}`} className="btn btn-danger" onClick={()=> this.onDelete(park.id)}>Delete</button></th>

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

    export default ParksList