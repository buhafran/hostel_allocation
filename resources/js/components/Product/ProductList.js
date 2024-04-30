 import axios from 'axios'
    import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getProducts,deleteProduct} from '../Actions';
    class ProductList extends Component {
      constructor() {
        super();
        this.state = { tabledata: [] };
      }

      componentDidMount() {
        var self = this;
        getProducts( response=> {
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
    deleteProduct(id,(response)=>{
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
            <h1 className="h3 mb-12 text-gray-800">Products List</h1>
            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                   <Link to='/admin/products/create' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm "  ><i className="fas fa-edit fa-sm text-white-50"></i> New</Link>
                  <a className="btn btn-sm" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Fiter
              </a>

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
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover compact dataTable" id="dataTable" width="100%" cellSpacing="0" style={{fontSize:'12px'}}>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>ShortName</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Bulk Price</th>
                            <th>Unit Price</th>
                            <th>Rating</th>
                            <th>Visible</th>
                
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>ShortName</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Bulk Price</th>
                            <th>Unit Price</th>
                            <th>Rating</th>
                            <th>Visible</th>
                
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
                                  <td>{park.Name}</td>
                                  <td>{park.ShortName}</td>
                                  <td>{park.Description}</td>
                                  <td>{park.category ? park.category.CategoryName: ''}</td>
                                  <td>{park.brand ? park.brand.BrandName : ''}</td>
                                  <td>{park.BulkPrice}</td>
                                  <td>{park.UnitPrice}</td>
                                  <td>{park.Star}</td>
                                  <td>{park.ShowItem==1? "Yes":"No"}</td>
                                  <td>{ds}</td>
                                  <td><Link className="btn btn-datatable btn-icon btn-transparent-dark mr-2" to={`/admin/products/${park.id}`}><i className="far fa-edit"></i>
</Link><button type="button" do='delete' key={`${park.id}`} className="btn btn-datatable btn-icon  mr-2 btn-danger" onClick={()=> this.onDelete(park.id)}><i className="fas fa-trash-alt"></i>
</button></td>

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

    export default ProductList