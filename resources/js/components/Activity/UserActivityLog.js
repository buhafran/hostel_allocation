import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import Body from '../Body'
import axios from 'axios';
import swal from 'sweetalert';
import {getMyActivity,getDataByPage} from '../Actions';
export default class UserActivityLog extends Component{
  constructor() {
    super();
    this.state = {tabledata:{data:[]} };
  }

  getData(){
     var self= this;
  getMyActivity((response)=>{
    //console.log('Log', response)
      if(response)
      {
        self.setState({
          ... self.state,
          tabledata:response.data
        })
       
      }
        //console.log(response.data)
    }).then(function(){
      $('.dataTable').dataTable({
                 paging: false,
                dom: 'Bfrtip',
                buttons: [
                    {extend:'print',

                      title: '',
                      customize: function ( win ) {
                          $(win.document.body)
                              .css( 'font-size', '10pt' )
                              .prepend(
                                  '<center><img src="https://faabzlogistics.com/img/logo.png"/><br>Activity Log<h1>FAABZ LOGISTICS</h1> </center> '
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
  changePage(url){
        getDataByPage(url,(response)=>{
    console.log('Log', url)
      if(response)
      {
        this.setState({
          ... self.state,
          tabledata:response.data
        })
       
      }
        //console.log(response.data)
    }).then(function(){
    //   $('.dataTable').dataTable({
    //              paging: false,
    //             dom: 'Bfrtip',
    //             buttons: [
    //                 {extend:'print',

    //                   title: '',
    //                   customize: function ( win ) {
    //                       $(win.document.body)
    //                           .css( 'font-size', '10pt' )
    //                           .prepend(
    //                               '<center><img src="https://faabzlogistics.com/img/logo.png"/><br>Activity Log<h1>FAABZ LOGISTICS</h1> </center> '
    //                           );
       
    //                       $(win.document.body).find( 'table' )
    //                           .addClass( 'compact' )
    //                           .css( 'font-size', 'inherit' );
    //                   }

    //               },
    //                 'excel'
    //     ]
    // });
    })
  
  }
  deleteItem(id){
    deletePayment(id,(response)=>{
      if(response.status==200)
      {
        swal("Success!", "Deleted Successfully", "success");
                this.setState({
          ...this.state,
          tabledata:this.state.tabledata.filter(function(item){ return item.id!==id})
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
      <h1 className="h3 mb-12 text-gray-800">Activity Log</h1>
      <div className="row">

        <div className="col-lg-12">
          
    <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">...</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
               <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Action</th>
                      <th>Description</th>
                      <th>ip</th>
                      <th>Since</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                    <th>#</th>
                      <th>User</th>
                      <th>Action</th>
                      <th>Description</th>
                      <th>ip</th>
                      <th>Since</th>
                      <th>Timestamp</th>

                    </tr>
                  </tfoot>
                  <tbody>
                {
                  this.state.tabledata.data.map((transactions, index) => {
                 //var d= new Date(transactions.created_at);
                   // var ds= `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
                    return (
                      <tr key={index}>
                       <td>{index+1}</td>
                        <td>{transactions.user? <Link to={`/admin/users/${transactions.user.id}`}>{transactions.user.name}</Link> : ''} </td>
                        <td>{transactions.activity.name}</td>
                      
                        <td>{transactions.description}</td>
                        <td>{transactions.ip}</td>
                        <td>{transactions.created_at.since}</td>
                        <td><small style={{fontSize:'10px'}}>{transactions.created_at.raw}</small></td>
                   
                
                      </tr>
                    );
                  })
                }
                  </tbody>
                  </table>
                  {
                    this.state.tabledata.data ?
                  <center>
                  <button className="btn btn-primary" disabled={this.state.tabledata.prev_page_url===null} onClick={()=>this.changePage(this.state.tabledata.prev_page_url)}>Prev </button>
                  <button className="btn btn-primary"  disabled={this.state.tabledata.next_page_url===null} onClick={()=>this.changePage(this.state.tabledata.next_page_url)}>Next </button>
                  <br/>
                  Page: {this.state.tabledata.from} of {parseInt(this.state.tabledata.total/this.state.tabledata.per_page)+1}
                  </center>
                    :
                    ''
                  }
             </div>
            </div>
          </div>
          </div>
          </div>
          </div>


    )
  }
}