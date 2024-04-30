 import axios from 'axios'
    import React, { Component } from 'react'
import {getDashboardSummary} from '../Actions'
    class Dashboard extends Component {
      constructor (props) {
        super(props)
        this.state = {
          counter:{

          },
          loading:[]
        }
      }

      componentDidMount () {
          getDashboardSummary(data=>{
//console.log(data.data)
            if(data.data){
              this.setState({
                ...this.state,
                ...data.data
              })
            }
          })  
      }

      render () {
        const { counter,loading } = this.state

        return (
          <div>
           <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
             <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm "  ><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
          </div>

          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Fleet</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{counter.TotalFleets}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                    <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Staff/Users</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{counter.TotalStaff}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Total Customers</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{counter.TotalCustomers}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-user fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Deliveries</div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{counter.TotalDeliveries}</div>
                        </div>
                        <div className="col">
                    
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
           <div className="row">
            <div className="col-lg-12 mb-4">

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Progress</h6>
                </div>
                <div className="card-body">
                {
                  loading.map(function(load,index){
                    const color=['danger','info','success','primary']
                    let per= (100/load.Capacity)*load.Passengers;
                    // let rnd= Math.floor(Math.random(0,4));
                    return (<div key={index}>
                          <h4 className="small font-weight-bold">{load.Source} To {load.Destination}   ({load.Passengers}/{load.Capacity})<span className="float-right">{per}%</span></h4>
                         <div className="progress mb-4">
                           <div className={`progress-bar bg-${color[index % 4 ]}`} role="progressbar" style={{width: `${per}%`}} aria-valuenow={per} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          </div>
                      )
                  })
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