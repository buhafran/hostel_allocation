 import axios from 'axios'
    import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getFleets,deleteFleet} from '../Actions';
    class ListFleet extends Component {
      constructor() {
        super();
        this.state = { tabledata: [] };
      }

      componentDidMount() {
        var self = this;
        getFleets( response=> {
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
            <h1 className="h3 mb-12 text-gray-800">Fleets</h1>
            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary"><Link to='/admin/fleets/create' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm "  ><i className="fas fa-edit fa-sm text-white-50"></i> New</Link></h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover compact dataTable" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>#</th>

                            <th>License Plate</th>
                            <th>Driver</th>
                            <th>NetWeight</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tfoot>
                                   <tr>
                            <th>#</th>
                              <th>License Plate</th>
                            <th>Driver</th>
                            <th>NetWeight</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Status</th>
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
                                  <td>{it.LicenseNumber }</td>
                                  <td>{it.driver.FirstName || '--'}</td>
                                  <td>{it.NetWeight }</td>
                                  <td>{it.FleetType  }</td>
                                  <td>{it.Brand  }</td>
                                  <td>{it.Status  }</td>
                                  <td>{ds}</td>
                                  <td><Link className="btn btn-datatable btn-icon btn-dark mr-2" to={`/admin/fleets/${it.id}`}><i className="far fa-edit"></i></Link>
                                  <button type="button" do='delete' key={`${it.id}`} className="btn btn-datatable btn-icon  mr-2 btn-danger" title="Delete" onClick={()=> this.onDelete(it.id)}><i className="fas fa-trash-alt"></i></button></td>

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

    export default ListFleet