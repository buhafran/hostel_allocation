 import axios from 'axios'
    import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getVendors,deleteVendor, base_url} from '../Actions';
    class VendorList extends Component {
      constructor() {
        super();
        this.state = { tabledata: [] };
      }

      componentDidMount() {
        var self = this;
        getVendors( response=> {
          //console.log(response)
            if (response) {
              self.setState({
                ...self.state,
                tabledata: response.data.data
              })

            }
            console.log(response.data)
          }).then(function () {
                       $('.dataTable').dataTable({
                dom: 'Bfrtip',
                buttons: [
                    {extend:'print',

                      title: '',
                      customize: function ( win ) {
                          $(win.document.body)
                              .css( 'font-size', '10pt' )
                              .prepend(
                                  '<center><img src="'+ base_url +'/site/faabz_logo300.png" height="100px"/></center> '
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
    self=this;
    deleteVendor(id,(response)=>{
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
            <h1 className="h3 mb-12 text-gray-800">Vendors List</h1>
            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary"><Link to='/admin/vendors/create' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm "  ><i className="fas fa-edit fa-sm text-white-50"></i>New</Link></h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Vendor ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>isCompany</th>
                
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>#</th>
                            <th>Vendor ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>isCompany</th>
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
                                  <td>{park.VendorTag}</td>
                                  <td>{park.Name}</td>
                                  <td>{park.EmailAddress}</td>
                                  <td>{park.PhoneNumber}</td>
                                  <td>{park.Address}</td>
                      
                                  <td>{park.IsCompany==1? "Yes":"No"}</td>
                                  <td>{ds}</td>
                                  <td><Link className="btn btn-datatable btn-icon   btn-dark mr-2" to={`/admin/vendors/${park.id}`}><i className="far fa-edit"></i></Link><button type="button" do='delete' key={`${park.id}`} className="btn btn-datatable btn-icon mr-2 btn-danger" onClick={()=> this.onDelete(park.id)}><i className="far fa-trash-alt"></i></button></td>

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

    export default VendorList