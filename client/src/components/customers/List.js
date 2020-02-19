import React from 'react'
import axios from '../../config/axios';
import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'
import isEmpty from 'lodash/isEmpty'

class CustomerList extends React.Component {
    constructor() {
        super()
        this.state = {
            customers: []
        }
    }
    componentDidMount() {
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then((response) => {
            const customers = response.data
            this.setState({customers})
         })
         .catch((err) => {
            alert(err)
         })
    }

    handleRemove = (id) => {
        const confirm = window.confirm("Are you sure ?")
        if (confirm) {
            axios.delete(`/customers/${id}`,{
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
            .then((response) => {
                if (response.data.isCustomerAttached) {
                    alert('This customer has assigned to some other ticket, you can not delete')
                } else {
                    this.setState(prevState => ({
                        customers: prevState.customers.filter(cust => cust._id != id)
                    }))
                }
                
            })
            .catch((err) => {
                alert(err)
            })
        }
    }
 
    render() {
        return (
            <div className="container">
                <h2>Listing Customers - {this.state.customers.length}</h2>
                {
                    this.state.customers.length > 0 ? (
                    <div>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Actions</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.customers.map(customer => {
                                        return (
                                            <tr key={customer._id} >
                                                <td >{customer._id}</td>
                                                <td>{customer.name}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.mobile}</td>
                                                <td><Link to={`/customers/${customer._id}`}><Button color="info">Show</Button></Link></td>
                                                <td><Button color="danger" onClick={() => {
                                                        this.handleRemove(customer._id)
                                                    }}>Remove</Button>
                                                </td>
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
                <Link to="/customers/new"><Button color="secondary">Add Customer</Button></Link>
            </div>
        )
    }
}

export default CustomerList