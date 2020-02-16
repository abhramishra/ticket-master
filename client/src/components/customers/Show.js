import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
//import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'

class CustomerShow extends React.Component{
    constructor(){
        super()
        this.state = {
            customer: {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        console.log(id)
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
            console.log(err)
        })
    }

    render(){
        return(
            isEmpty(this.state.customer) ? (
                <div>
                    <p>loading...</p>
                </div>
            ) : (
                <div>
                    <h3>{this.state.customer._id} - {this.state.customer.name} - {this.state.customer.mobile}</h3>
                    <Link to={`/customers/edit/${this.state.customer._id}`}>Edit</Link>
                </div>
            )
        )
    }
}

export default CustomerShow