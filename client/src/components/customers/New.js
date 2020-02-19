import React from 'react'
import CustomerForm from './Form'
import axios from '../../config/axios'
class CustomerNew extends React.Component {
    handleSubmit = (formData) => {
        axios.post('/customers', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                this.props.history.push('/customers')
            }
        })
    }
    render() {
        return (
            <div className="container">
                <h1>New Customer</h1>
                <CustomerForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}
export default CustomerNew