 import axios from 'axios'
    import React, { Component } from 'react'
    import { Link } from 'react-router-dom'
     import logo from '../Assets/img/jcoe.jpg';
import {getMyReservation,getLoginUser,makeRoomReservation} from '../Actions'
    class Dashboard extends Component {
      constructor (props) {
        super(props)
        this.state = {
          has_reservation:true,
          user:{},
          counter:{

          },
          is_loading:false,
          loading:[]
        }
      }
            componentDidMount () {
        // getLoginUser(data=>{
        //   this.setState({
        //     ...this.state,
        //     user:data.data
        //   })
        // })
          getMyReservation("",data=>{
            console.log(data.data)
            if(data.data){
              if(data.status)
              {
                 this.setState({
                ...this.state,
                ...data.data
              })
              }
              else
              {
                this.setState({
                  has_reservation:false
                })

              }
             
            }
          })  
      }
        payWithRave(rave) {
     const API_publicKey = "FLWPUBK-f6a8ed302fb31c8735185c11caf0e0d2-X";
        var x = getpaidSetup({
            ...rave,
            onclose: function() {},
            callback: function(response) {
                var txref = response.data.txRef; // collect txRef returned and pass to a                    server page to complete status check.
                console.log("This is the response returned after a charge", response);
                if (
                    response.data.respcode == "00" ||
                    response.data.respcode == "0"
                ) {
                  swal("Payment Success", "Your Payment Was successful", 'succes');
                    location.reload();
                } else {
                    // redirect to a failure page.
                }

                x.close(); // use this to close the modal immediately after payment.
            }
        });
    }
      makeReservation(){
    swal({
    title: "Do you want to reserve a bed Space?",
    text: "Once You Reserve a room you will only be allowd ONE HOUR to make Payment",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
.then((willDelete) => {
  if (willDelete) {
   
      this.setState({
              ...this.state,
              is_loading:true
            })
        makeRoomReservation({},data=>{
          if(data.status)
          {
             this.setState({
              ...this.state,
              is_loading:false
            })
            swal("Success!","Reservation Successful", 'success');
            this.componentDidMount();
          }
          else
          {
            this.setState({
              ...this.state,
              is_loading:false
            })
            swal("Error!", data.message, 'error');
          }
        })

  } else {
   // swal("Canceled Successfully");
  }
});   






       
      }



      render () {
        const { allocation,reservation,user, building,transaction,rave} = this.state

        return (
          <div>
           <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">My Reservation</h1>
          </div>

          <div className="row">
      

          </div>
           <div className="row">
            <div className="col-lg-12 mb-4">

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Reservation</h6>
                </div>


                <br/>

                <div className="card-body">
                  
                {
                  user ?
                  <div>
                  <center> 
                      <img src={logo} style={{ height:'100px'}}/>
                      <h1>STUDENT HOSTEL RESERVATION FORM</h1>
                  </center> 
<table className="table">
                <tbody> 
                   <tr>
                <th colSpan={2}  style={{borderTop:"2px solid #ccc",borderBottom:"2px solid #ccc",letterSpacing:"6px", fontWeight:"bold"}}> <h2 className="text-center" > STUDENT INFORMATION</h2></th>
                </tr>
                  <tr>
                    <th style={{width:"300px"}}>Student Name</th>
                    <td>{user.name }</td>
                  </tr>
                  <tr>
                    <th>Student Registration Number</th>
                    <td>{user.registration_number}</td>
                  </tr>
                      <tr>
                    <th>Email</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>{user.gender}   ({user.gender=='F'?" FEMALE HOSTEL": user.gender=='M'?" MALE HOSTEL" : ""})</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{user.category}</td>
                  </tr>
            </tbody>
                </table>
                </div>
                : ''

                }
   {
                  reservation?
              <table className="table">
                <tbody> 
                <tr >
                <th colSpan={2} style={{borderTop:"2px solid #ccc",borderBottom:"2px solid #ccc",letterSpacing:"6px", fontWeight:"bold"}} > <h2 className="text-center"> ROOM RESERVED</h2></th>
                </tr>
             
                  <tr>
                    <th style={{width:"300px"}}>Building</th>
                    <td>{building.name} <br />  {building.gender=="F"? "FEMALE" : (building.gender=="M"? "MALE":"") } HOSTEL</td>
                  </tr>
                  <tr>
                    <th>Room Number</th>
                    <td>{building.room_number}</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{building.category}</td>
                  </tr>
                 
                           </tbody>
                </table>
                :  ""
                }

                   {
                  transaction?
              <table className="table">

                <tbody> 
                   <tr>
                <th colSpan={2}  style={{borderTop:"2px solid #ccc",borderBottom:"2px solid #ccc",letterSpacing:"6px", fontWeight:"bold"}}> <h2 className="text-center"> PAYMENT</h2></th>
                </tr>
                  <tr>
                    <th style={{width:"300px"}}>TRANSACTION REFERENCE </th>
                    <td>{transaction.trans_ref}   </td>
                  </tr>
                  <tr>
                    <th>AMOUNT DUE</th>
                    <td>{transaction.amount_due}</td>
                  </tr>
                  <tr>
                    <th>AMOUNT PAID</th>
                    <td>{transaction.amount_paid}</td>
                  </tr>
                    <tr>
                    <th>Payment Status</th>
                    <td><b>{transaction.payment_status===1 || transaction.payment_status==='1' ? 'PAID' : (transaction.amount_paid>0? "INCOMPLETE": "PENDING") }</b></td>
                  </tr>
                 
                           </tbody>
                </table>
                :  ""
                }
     
{

  (( transaction==null || transaction.payment_status==0) ?
  <p className="text-danger">
  
  You are strongly advised to confirm your gender and studentship category.  Click <Link to="/student/profile">here</Link> to edit
   <br/>
   Once You Reserve a bed, you  will be allowed only <b>ONE HOUR  </b> to make payment. failure to make payment within the stated time will result in cancelation of your reservation. 

  </p>
  :'')
}

{
  reservation===null ?

  this.state.available>0?
  <div>

  <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm " onClick={()=>this.makeReservation()}  disabled={this.state.is_loading} ><i className="fas fa-download fa-sm text-white-50"></i> New Reservation</button>
  </div>
    :
    <p className="alert alert-danger">No Bed Space Available, Checkback soon</p>

    :
    transaction && transaction.payment_status!=1 ?
      <button className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm " onClick={()=>this.payWithRave(rave)}  disabled={this.state.is_loading} ><i className="fas fa-download fa-sm text-white-50"></i>Make Payment</button>
      :
      transaction?
      <button className="btn btn-success" onClick={()=>window.print()}>PRINT</button> : ''
  }
                
              
                 
                </div>
              </div>
              </div>
            </div>
         </div>
        )
      }
    }

    export default Dashboard