import React from 'react'
import TicketForm from './Form'
import axios from '../../config/axios'

class TicketNew extends React.Component {
    // constructor() {

    // }
    handleSubmit =(formData) => {
        axios.post('/tickets', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                if (response.status == 200) {
                    this.props.history.push('/tickets')
                } else {
                    alert('Error', response.data.message)
                }
            })
            .catch(err => {
                alert(err)
            }) 
    }
    render() {
        return (
            <div className="container">
                <h1>Add Ticket</h1>
                <TicketForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}
export default TicketNew