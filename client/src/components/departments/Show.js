import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'

class DepartmentShow extends React.Component {
    constructor() {
        super()
        this.state = {
            department: {},
            deptWiseTicket: []
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/departments/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const department = response.data
                this.setState({ department })
            })
            .catch(err => {
                if(!err.response) {
                    alert('Internal server error')
                } else if(err.response.status == 401) {
                    alert(err.response.data.message)
                }
                // alert(err)
            })

        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const tickets = response.data
                const deptWiseTicket = tickets.filter(ticket => ticket.department._id == id)
                this.setState({ deptWiseTicket })
            })
    }
    render() {
        return (
            <div className="container">
                <h2>Department - { this.state.department.name }</h2>
                <Link to={`/departments/edit/${this.props.match.params.id}`}>Edit</Link>
                {
                    this.state.deptWiseTicket.length ? (
                        <div className="row">
                            {
                                this.state.deptWiseTicket.map(ticket => {
                                    return (
                                        <div className="col-md-6 text-center">
                                            <Card>
                                                <CardBody>
                                                    <CardText>Code - {ticket.code}</CardText>
                                                    <CardText>Customer - {ticket.customer.name}</CardText>
                                                    <CardText>Department - {ticket.department.name}</CardText>
                                                    <CardText>Employees - {ticket.employees.map(employee => <span key={employee._id}>{employee.name}, </span>)}</CardText>
                                                    <CardText>Message - {ticket.message}</CardText>
                                                    <CardText>Priority - {ticket.priorities}</CardText>
                                                    <Link to={`/tickets/${ticket._id}`}><Button>Show Ticket</Button></Link>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    ) : (
                        <p>No ticket issued by {this.state.department.name} department</p>
                    )
                }
            </div>
        )
    }
}

export default DepartmentShow