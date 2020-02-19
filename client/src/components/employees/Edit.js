import React from 'react'
import axios from '../../config/axios'
import EmployeesForm from './Form'
import isEmpty from 'lodash/isEmpty'

class EmployeeEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            employee: {}
        }
    }
    componentDidMount() {
        axios.get(`/employees/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const employee = response.data
                this.setState({ employee })
            })
            .catch(err => {
                alert(err)
            })
    }
    render() {
        return (
            <div className="container">
                <h2>Employee Edit</h2>
                { !isEmpty(this.state.employee) && <EmployeesForm handleSubmit={this.handleSubmit} employee={this.state.employee} /> }
            </div>
        )
    }
}

export default EmployeeEdit