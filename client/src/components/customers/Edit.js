import React from 'react'
import Form from './Form'
import axios from '../../config/axios'
import isEmpty from 'lodash/isEmpty'

class CustomerEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            customer: {}
        }
    }

    componentDidMount() {
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
    }

    handleSubmit = (formData) => {
        axios.put(`/customers/${this.props.match.params.id}`,formData,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            this.props.history.push(`/customers/${this.props.match.params.id}`)
        })
        .catch((err) => {
            alert(err)
        })
    }
    
    render() {
        return (
            <div className="container">
                <h1>Customer Edit</h1>
                {
                    !isEmpty(this.state.customer) && <Form handleSubmit={this.handleSubmit} customer={this.state.customer}/>
                }
                
            </div>

        )
    }
}

export default CustomerEdit