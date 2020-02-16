import React from 'react'
import axios from '../../config/axios';
import { Link } from 'react-router-dom'

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

    handleClick = (id) => {
        const confirm = window.confirm("Are you sure ?")
        if (confirm) {
            axios.delete(`/customers/${id}`,{
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
            .then((response) => {
                const customer = response.data
                this.setState(prevState => ({
                    customers: prevState.customers.filter(cust => cust._id != id)
                }))
            })
            .catch((err) => {
                alert(err)
            })
        }
    }
 
    render() {
        return (
            <div>
                <h2>Listing Customers</h2>
                {
                    this.state.customers.length == 0 ? (
                        <div>
                            <p>No customer found. Add your first customer</p>
                        </div>
                    ) : (
                        <div>
                            <ul>
                                {
                                    this.state.customers.map(customer => {
                                        return <li key={customer._id}><Link to={`/customers/${customer._id}`}>{ customer.name }</Link>
                                            <button onClick={() => {
                                                this.handleClick(customer._id)
                                            }}>Remove</button>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    )
                }
                
                <Link to="/customers/new">Add Customer</Link>
            </div>
        )
    }
}

export default CustomerList