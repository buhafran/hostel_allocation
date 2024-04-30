import axios from 'axios'
import React, { Component } from 'react'
import ExpensesForm from './ExpensesForm'
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import {getExpensesTypes,createVehicleExpense} from '../Actions'
class CreateVehicleExpenses extends Component {
      constructor (props) {
        super(props)
        this.state = {
          formsubmitted:false,
          expenseTypes:[]
          
        }
      }

      componentDidMount () {
        // const vehicleId = this.props.match.params.id

        getExpensesTypes(response => {
        if(response)
        {
          //console.log(response)

          this.setState({
            ...this.state,
            expenseTypes: response.data,
           // tasks: response.data.tasks
          })
        }
        })
      }
submitForm(values){
  values.vehicle_id=this.props.match.params.id;
  console.log(JSON.stringify(values, null, 2));
  var self= this;
  createVehicleExpense(values,(response)=> {
      if(response)
      { 
        self.setState({
          ...self.state,
          formsubmitted: true
        })
      }

  })
  //return true;
}
      render () {
        const {formsubmitted } = this.state

        return (this.state.formsubmitted ? <Redirect to={`/home/vehicles/${this.props.match.params.id}`}/> :(
          <div>
                <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Create Expenses</h6>
                </div>
                <div className="card-body">
              
                  <ExpensesForm handleFormSubmit={this.submitForm.bind(this)} expenseTypes={this.state.expenseTypes}/>
                </div>
              </div>

          
         </div>
        ))
      }
    }

    export default CreateVehicleExpenses