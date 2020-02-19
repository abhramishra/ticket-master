import React from 'react'
import axios from '../../config/axios'
import TicketForm from './Form'
import isEmpty from 'lodash/isEmpty'

class TicketEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            ticket: {}
        }
    }
    componentDidMount() {
        axios.get(`/tickets/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then(response => {
            const ticket = response.data
            this.setState({ ticket })
         })
         .catch(err => {
            alert(err)
         })
    }

    handleSubmit = (formData) => {

    }

    render() {
        return (
            <div className="container">
                <h1>Edit</h1>
                { !isEmpty(this.state.ticket) && <TicketForm handleSubmit={this.handleSubmit} ticket={this.state.ticket} /> } 
            </div>
        )
    }
}

export default TicketEdit