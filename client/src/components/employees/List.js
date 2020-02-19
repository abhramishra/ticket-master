import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import { Table, Button } from 'reactstrap'

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
        const confirm = window.confirm("Are yoy sure ?")
        if (confirm) {
            axios.delete(`/employees/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then(response => {
                    const employees = this.state.employees.filter(employee => employee._id != id)
                    this.setState({ employees })
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Employees - {this.state.employees.length}</h1>
                {
                    this.state.employees.length > 0 ? (
                    <div>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(emp => {
                                        return (
                                            <tr key={emp._id}>
                                                <td>{emp._id}</td>
                                                <td>{emp.name}</td>
                                                <td>{emp.email}</td>
                                                <td>{emp.mobile}</td>
                                                <td>{emp.department.name}</td>
                                                <td><Link to={`/employees/${emp._id}`}><Button color="info">Show</Button></Link></td>
                                                <td><Button color="danger" onClick={() => {
                                                    this.handleRemove(emp._id)
                                                }}>Remove</Button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                    ):(
                        <div>
                            <p>No employee added</p>
                        </div>
                    )

                }
                <center><Link to="/employees/new"><Button color="secondary">Add new Employee</Button></Link></center>
            </div>
        )
    }
}

export default EmployeeList