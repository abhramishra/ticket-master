import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardText, Button } from 'reactstrap'

class TicketShow extends React.Component {
    constructor() {
        super()
        this.state = {
            ticket: {}
            // customer: {},
            // department: {},
            // employees: []
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then(response => {
             const ticket = response.data
             this.setState({ ticket })
             // to get the customer
            //  const customerId = this.state.ticket.customer
            //  axios.get(`/customers/${customerId}`, {
            //      headers: {
            //          'x-auth': localStorage.getItem('authToken')
            //      }
            //  })
            //  .then(response => {
            //      const customer = response.data
            //      this.setState({ customer })
            //  })
            //  .catch(err => {
            //      alert(err)
            //  })
            //  // to get the department
            //  const departmentId = this.state.ticket.department
            //  axios.get(`/departments/${departmentId}`, {
            //      headers: {
            //          'x-auth': localStorage.getItem('authToken')
            //      }
            //  })
            //  .then(response => {
            //      const department = response.data
            //      this.setState({ department })
            //  })
            //  .catch(err => {
            //      alert(err)
            //  })
         })
         .catch(err => {
             alert(err)
         })
        
        
    }
    render() {
        const ticket = this.state.ticket
        return (
            <div className="container">
                <h1>Ticket</h1>
                {
                    Object.values(this.state.ticket).length ? (
                        <div>
                            <Card>
                                <CardBody>
                                    <CardText>Code - {ticket.code}</CardText>
                                    <CardText>Customer - {ticket.customer.name}</CardText>
                                    <CardText>Department - {ticket.department.name}</CardText>
                                    <CardText>Employees - {ticket.employees.map(employee => <span key={employee._id}>{employee.name}, </span>)}</CardText>
                                    <CardText>Message - {ticket.message}</CardText>
                                    <CardText>Priority - {ticket.priorities}</CardText>
                                </CardBody>
                            </Card><br/>
                            <Link to={`/tickets/edit/${ticket._id}`}><Button>Edit</Button> </Link>
                            <Link to={`/tickets`}> <Button>Back</Button></Link>
                        </div>
                    ): (
                        <div>
                            <p>Loading .......</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default TicketShow