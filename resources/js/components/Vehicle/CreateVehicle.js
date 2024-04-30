 import axios from 'axios'
    import React, { Component } from 'react'
    import VehicleForm from './VehicleForm'
    import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import {createVehicle} from "../Actions";
    class CreateVehicle extends Component {
      constructor (props) {
        super(props)
        this.state = {
          formsubmitted:false,
          isSubmitting:false
          
        }
      }

      componentDidMount () {
        // const vehicleId = this.props.match.params.id

        // axios.get(`/api/vehicle/${vehicleId}`).then(response => {
        //   this.setState({
        //     vehicle: response.data,
        //    // tasks: response.data.tasks
        //   })
        // })
      }
submitForm(values){
  //alert(JSON.stringify(values, null, 2));
  var self= this;

  createVehicle(values,function (response) {
      if(response.plate_number)
      { 
        self.setState({
          ...self.state,
          formsubmitted: true

        })
      }
    console.log(response)
  }).then(function(){
  //  alert("done")
  })

  //return true;
}
      render () {
        const {formsubmitted } = this.state

        return (this.state.formsubmitted ? <Redirect to="/home/vehicles"/> :(
          <div>
                <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Create New vehicle</h6>
                </div>
                <div className="card-body">
                  <VehicleForm handleFormSubmit={this.submitForm.bind(this)} isSubmitting={this.state.isSubmitting}/>
                </div>
              </div>

          
         </div>
        ))
      }
    }

    export default CreateVehicle