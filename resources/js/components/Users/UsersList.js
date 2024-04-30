 import axios from 'axios'
    import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getUsers,deleteUser} from '../Actions';
    class UserList extends Component {
      constructor() {
        super();
        this.state = { tabledata: [] };
      }

      componentDidMount() {
        var self = this;
        getUsers( response=> {
          console.log(response)
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
            console.log(error);
          });
      }
    deleteItem(id){
    self=this;
    deleteUser(id,(response)=>{
      //console.log(response);
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
            <h1 className="h3 mb-12 text-gray-800">Users List</h1>
            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <Link to='/admin/users/create' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm "  ><i className="fas fa-edit fa-sm text-white-50"></i> New</Link>
  
                
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                           <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {
                            this.state.tabledata.map((user, index) => {
                              var d = new Date(user.created_at);
                              var ds = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>{user.role}</td>
                                  <td>{ds}</td>
                                  <td><Link to={`/admin/users/${user.id}`} className="btn btn-datatable btn-icon btn-dark"><i class="fas fa-user-edit"></i></Link><button type="button" do='delete' key={`${user.id}`} className="btn btn-datatable btn-icon btn-danger" onClick={()=> this.onDelete(user.id)} ><i className="fas fa-trash-alt"></i></button></td>

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

    export default UserList