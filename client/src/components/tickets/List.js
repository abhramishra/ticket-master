import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class TicketList extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: [],
            employees: [],
            departments: [],
            customers: [],
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
            //  console.log(ticket)
             this.setState(prevState => ({
                 tickets: prevState.tickets.concat(ticket),
                 count: ticket.length
             }))            
         })
         .catch((err) => {
             alert(err)
         })
        // to get all the employee
        axios.get('/employees',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then((response) => {
             const employees =  response.data
            //  console.log(employees)
             this.setState({employees})
         })
         .catch((err) => {
             alert(err)
         })

        // to get all the departments
        axios.get('/departments',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then((response) => {
             const departments =  response.data
             console.log(departments)
             this.setState({departments})
         })
         .catch((err) => {
             alert(err)
         })
        // to get all the customers
        axios.get('/customers',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then((response) => {
             const customers =  response.data
             console.log(customers)
             this.setState({customers})
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

    render() {
        return (
            <div>
                <h1>Tickets - { this.state.tickets.length } </h1>
                <table border="1">
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
                                        <td>{ this.state.customers.length && this.state.customers.find(customer => customer._id == ticket.customer).name }</td>
                                        <td>{ this.state.departments.length && this.state.departments.find(department => department._id == ticket.department).name }</td>
                                        <td>pending</td>
                                        <td>{ ticket.message }</td>
                                        <td>{ ticket.priority }</td>
                                        <td><button>Show</button></td>
                                        <td><button>Remove</button></td>
                                        <td><input type="checkbox" onChange={this.handleChange}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="progress">
                    <div className="progress-bar" style={{width: `${this.state.progressBar}%`}}></div>
                </div>
                <Link to="/ticket/new">Add Ticket</Link>
            </div>
        )
    }
}

export default TicketList