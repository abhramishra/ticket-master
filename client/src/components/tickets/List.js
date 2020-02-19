import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import {Table, Button} from 'reactstrap'

class TicketList extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: [],
            progressBar: 0,
            count: 0
        }
    }
    componentDidMount() {
        // to get all the ticktes
        axios.get('/tickets',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then((response) => {
             const ticket = response.data
             this.setState(prevState => ({
                 tickets: prevState.tickets.concat(ticket),
                 count: ticket.length
             }))            
         })
         .catch((err) => {
             alert(err)
         })
    }

    handleChange = (e) => {
            console.log('COUNT', this.state.count)
            if (e.target.checked) {
                const progressBar = (100 / this.state.count)
                console.log(progressBar)
                this.setState(prevState => ({
                    progressBar,
                    count: prevState.count - 1
                }))
            } else {

                if (this.state.count == 0 ){
                    const progressBar = 0
                    this.setState(prevState => ({
                        progressBar,
                        count: prevState.count + 1
                    }))
                } else {
                    const progressBar = 100 / this.state.count
                    alert(progressBar)
                    this.setState(prevState => ({
                        progressBar,
                        count: prevState.count + 1
                    }))
                }
                console.log('COUNT', this.state.count)

            }
    }

    handleRemove = (id) => {
        const confirm = window.confirm("Are you sure ?")
        if (confirm) {
            axios.delete(`/tickets/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
             .then(response => {
                const tickets = this.state.tickets.filter(ticket => ticket._id != id)
                this.setState({ tickets })
             })
             .catch(err => {
                 alert(err)
             })
            
        }
        
    }

    render() {
        return (
            <div className="container">
                <h1>Tickets - { this.state.tickets.length } </h1>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Code no</th>
                            <th>customer</th>
                            <th>Department</th>
                            <th>Employee</th>
                            <th>Message</th>
                            <th>Priority</th>
                            <th>Show</th>
                            <th>Remove</th>
                            <th>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tickets.map(ticket => {
                                return (
                                    <tr key={ticket._id}>
                                        <td>{ ticket.code }</td>
                                        {/* <td>{ this.state.customers.length && this.state.customers.find(customer => customer._id == ticket.customer._id).name }</td> */}
                                        <td>{ ticket.customer.name }</td>
                                        {/* <td>{ this.state.departments.length && this.state.departments.find(department => department._id == ticket.department._id).name }</td> */}
                                        <td>{ ticket.department.name }</td>
                                        <td>{ ticket.employees.map(emp => <li key={emp._id}>{ emp.name }</li>) }</td>
                                        <td>{ ticket.message }</td>
                                        <td>{ ticket.priorities }</td>
                                        <td><Link to={`/tickets/${ticket._id}`}><Button color="info">Show</Button></Link></td>
                                        <td><Button color="danger" onClick={() => {
                                            this.handleRemove(ticket._id)
                                        }}>Remove</Button></td>
                                        <td><input type="checkbox" onChange={this.handleChange}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div className="progress">
                    <div className="progress-bar" style={{width: `${this.state.progressBar}%`}}></div>
                </div>
                <Link to="/tickets/new"><Button color="secondary">Add Ticket</Button></Link>

                <div>
                    
                </div>
            </div>
        )
    }
}

export default TicketList