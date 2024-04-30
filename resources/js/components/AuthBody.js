
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Link } from 'react-router-dom'
    //import { BrowserRouter, Route, Switch } from 'react-router-dom'

 export default  class AuthBody extends Component{

      render(){
        return (
   <div className="container">

    
    <div className="row justify-content-center">

      <div className="col-xl-8 col-lg-10 col-md-6">
    <br/>


           
        <div className="card o-hidden border-0 shadow-lg my-5 mb-5">

          <div className="card-body p-0">
       
            <div className="row">
             
              <div className="col-lg-12">
                <div className="p-5">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>


  </div>

          )
      }

    }



  