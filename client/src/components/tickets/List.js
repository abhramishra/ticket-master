import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import {Table, Button} from 'reactstrap'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class TicketList extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: [],
            pieChartOptions: [],
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
             console.log(ticket)
             this.setState(prevState => ({
                 tickets: prevState.tickets.concat(ticket),
                 count: ticket.length
             }))  
             this.setupPieData()
         })
         .catch((err) => {
             alert(err)
         })
    }

    setupPieData = () => {
        const highData = this.state.tickets.filter(ticket => ticket.priorities == 'high')        
        const mediumData = this.state.tickets.filter(ticket => ticket.priorities == 'medium')
        const lowData = this.state.tickets.filter(ticket => ticket.priorities == 'low')
        const pieChartOptions = [{ name: 'High',y: highData.length }, { name: 'Medium', y: mediumData.length}, { name: 'Low', y: lowData.length}]
        this.setState({ pieChartOptions })
    }

    handleChange = (e) => {

            // console.log('COUNT', this.state.count)
            // if (e.target.checked) {
            //     const progressBar = (100 / this.state.count)
            //     console.log(progressBar)
            //     this.setState(prevState => ({
            //         progressBar,
            //         count: prevState.count - 1
            //     }))
            // } else {

            //     if (this.state.count == 0 ){
            //         const progressBar = 0
            //         this.setState(prevState => ({
            //             progressBar,
            //             count: prevState.count + 1
            //         }))
            //     } else {
            //         const progressBar = 100 / this.state.count
            //         alert(progressBar)
            //         this.setState(prevState => ({
            //             progressBar,
            //             count: prevState.count + 1
            //         }))
            //     }
            //     console.log('COUNT', this.state.count)

            // }
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
                this.setupPieData()
             })
             .catch(err => {
                 alert(err)
             })
            
        }
        
    }

    render() {
        const options = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'My Chart'
            },
            series: [
                {
                    // data: [{name: 'High', y: 6}, {name: 'Medium', y: 2}, {name: 'Low', y: 2 }]
                    data: this.state.pieChartOptions
                }
            ]
        };
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
                                        <td>{ ticket.customer.name }</td>
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
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </div>
        )
    }
}

export default TicketList