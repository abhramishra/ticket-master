import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'

class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get('/employees',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const employees = response.data
            this.setState({employees})
        })
    }

    handleRemove = (id) => {
        
    }

    render() {
        return (
            <div>
                {
                    this.state.employees.length > 0 ? (
                    <div>
                        <ul>
                            {
                                this.state.employees.map(emp => {
                                    return <li key={emp._id}>{ emp._id } - { emp.name } - { emp.email } - { emp.department.name } <button onClick={() => {
                                        this.handleRemove(emp._id)
                                    }}>Remove</button></li>
                                })
                            }
                        </ul>
                    </div>
                    ):(
                        <div>
                            <p>No employee added</p>
                        </div>
                    )

                }
                <Link to="/employees/new">Add new Employee</Link>
            </div>
        )
    }
}

export default EmployeeList