import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class EmployeeShow extends React.Component {
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
                <h2>{this.state.employee.name} - {this.state.employee.email}</h2>
                <Link to={`/employees/edit/${this.props.match.params.id}`}>Edit</Link>
            </div>

        )
    }
}

export default EmployeeShow