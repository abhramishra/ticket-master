import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
//import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap'

class CustomerShow extends React.Component{
    constructor(){
        super()
        this.state = {
            customer: {},
            customerTickets: []
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const customer = response.data
                this.setState({customer})
            })
            .catch((err) => {
                alert(err)
            })
        
        axios.get('/tickets',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const tickets = response.data
                const customerTickets = tickets.filter(ticket => ticket.customer._id == id)
                this.setState({ customerTickets })
            })
    }

    render(){
        return(
            isEmpty(this.state.customer) ? (
                <div className="container">
                    <p>loading...</p>
                </div>
            ) : (
                <div className="container">
                    <h3>{this.state.customer.name} - {this.state.customer.email}</h3>
                    <Link to={`/customers/edit/${this.state.customer._id}`}><Button>Edit</Button></Link><br/><br/>
                    {
                        this.state.customerTickets.length ? (
                            <div className="row">                                
                                {
                                    this.state.customerTickets.map(ticket => {
                                        return (
                                            <div className="col-md-6 text-center">
                                                <Card>
                                                    <CardBody>
                                                        <CardTitle>Code - {ticket.code}</CardTitle>
                                                        <CardText>customer - {ticket.customer.name}</CardText>
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
                            <p>No ticket issued by {this.state.customer.name}</p>
                        )
                    }
                    
                    
                </div>
            )
        )
    }
}

export default CustomerShow