 import axios from 'axios'
    import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getProductModels,deleteProductModel} from '../Actions';
    class ModelList extends Component {
      constructor() {
        super();
        this.state = { tabledata: [] };
      }

      componentDidMount() {
        var self = this;
        getProductModels( response=> {
         console.log(response)
            if (response) {
              self.setState({
                ...self.state,
                tabledata: response.data.data
              })

            }
         //   console.log(response.data)
          }).then(function () {
            $('.dataTable').dataTable();
          })
      }
    deleteItem(id){
    self=this;
    deleteProductModel(id,(response)=>{
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
            <h1 className="h3 mb-12 text-gray-800">Product Model List</h1>
            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary"><Link to='/admin/product/models/create' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm "  ><i className="fas fa-edit fa-sm text-white-50"></i>New</Link></h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                             <th>#</th>
                             <th>Name</th>
                            <th>Brand</th>
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
                                  <td>{park.ModelName}</td>
                                  <td>{park.brand.BrandName}</td>
                              
                                  <td>{ds}</td>
                                  <td><Link className="btn btn-primary" to={`/admin/product/models/${park.id}`}>Edit</Link><button type="button" do='delete' key={`${park.id}`} className="btn btn-danger" onClick={()=> this.onDelete(park.id)}>Delete</button></td>

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

    export default ModelList