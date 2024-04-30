 import axios from 'axios'
    import React, { Component } from 'react'

    class UserForm extends Component {
      constructor (props) {
        super(props)
        this.state = {
          
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

      render () {
        const { project, tasks } = this.state

        return (
          <div>
         </div>
        )
      }
    }

    export default UserForm