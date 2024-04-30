 import axios from 'axios'
    import React, { Component } from 'react'
    import { Link } from 'react-router-dom'
     import logo from '../Assets/img/jcoe.jpg';
import {getLoginUser,registrationStatusByRefOrRegno, APP_DEMO} from '../Actions'
    class PaymentInvoice extends Component {
      constructor (props) {
        super(props)
        this.state = {
          data_loaded:false,
          student:null,
          counter:{

          },
          is_loading:false,
          loading:[]
        }
      }
            componentDidMount () {
  const id = this.props.match.params.id
    
          registrationStatusByRefOrRegno(id,data=>{
            console.log(data)
            if(data.data){
              if(data.status)
              {
                 this.setState({
                  data_loaded:true,
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
     const API_publicKey= (APP_DEMO? "FLWPUBK_TEST-23df7eae3d6e26b57091a440572e053f-X":"FLWPUBK-f6a8ed302fb31c8735185c11caf0e0d2-X") ;
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



      render () {
        const { transaction,student,rave} = this.state

        return (
          <div>
           <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800 text-center"></h1>
          </div>

          <div className="row">
      

          </div>
           <div className="row">
            <div className="col-sm-8 mb-4 offset-sm-2">

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Registration</h6>
                </div>


                <br/>

                <div className="card-body ">
                  
                {
                  student ?
                  <div>
                  <center> 
                      <img src={logo} style={{ height:'100px'}}/>
                      <h1>SPILL OVER REGISTRATION PAYMENT</h1>
                  </center> 
<table className="table">
                <tbody> 
                   <tr>
                <th colSpan={2}  style={{borderTop:"2px solid #ccc",borderBottom:"2px solid #ccc",letterSpacing:"6px", fontWeight:"bold"}}> <h2 className="text-center" > STUDENT INFORMATION</h2></th>
                </tr>
                  <tr>
                    <th style={{width:"300px"}}>Student Name</th>
                    <td>{student.first_name } {student.middle_name } {student.last_name }</td>
                  </tr>
                  <tr>
                    <th>Student Registration Number</th>
                    <td>{student.reg_no}</td>
                  </tr>
                      <tr>
                    <th>Email</th>
                    <td>{student.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{student.phone}   </td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{student.category}/{student.indegene==1? "Indegene": "Non-Indegene"} </td>
                  </tr>
            </tbody>
                </table>
                </div>
                : ''

                }
 

                   {
                  transaction?
                  <div>
              <table className="table">

                <tbody> 
                   <tr>
                <th colSpan={2}  style={{borderTop:"2px solid #ccc",borderBottom:"2px solid #ccc",letterSpacing:"6px", fontWeight:"bold"}}> <h2 className="text-center"> PAYMENT</h2></th>
                </tr>
                  <tr>
                    <th style={{width:"300px"}}>TRANSACTION REFERENCE </th>
                    <td>{transaction.year}/{transaction.trans_ref}   </td>
                  </tr> 
                  <tr>
                    <th style={{width:"300px"}}>Service </th>
                    <td>{transaction.type? transaction.type.description :''}   </td>
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
                    <th>PAYMENT DATE</th>
                    <td>{transaction.payment_date}</td>
                  </tr>
                    <tr>
                    <th>Payment Status</th>
                    <td><b>{transaction.payment_status===1 || transaction.payment_status==='1' ? 'PAID' : (transaction.amount_paid>0? "INCOMPLETE": "PENDING") }</b></td>
                  </tr>
                 
                           </tbody>
                </table>
                <Link to="/student/registration">Go Back </Link>
                    { 
                  transaction && transaction.payment_status!=1 ?
                  <button className="d-sm-inline-block btn btn-sm btn-danger shadow-sm " onClick={()=>this.payWithRave(rave)}  disabled={this.state.is_loading} ><i className="fas fa-download fa-sm text-white-50"></i>Make Payment</button>
                 :
                    <button className="btn btn-success" onClick={()=>window.print()}>PRINT</button> 
                 }

                 
                  
                
                </div>
             
                :  this.state.data_loaded ? <h1 className="text-danger text-center">No Transaction Found</h1> : <h2>Please Wait ....</h2>
                }
     
{

  (( transaction!=null &&  transaction.payment_status==0) ?
  <p className="text-danger">
  Kindly confirm the details above before making payment.  
  </p>
  :'')
}

                
              
                 
                </div>
              </div>
              </div>
            </div>
         </div>
        )
      }
    }

    export default PaymentInvoice