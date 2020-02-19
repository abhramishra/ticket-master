import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './Form'
import isEmpty from 'lodash/isEmpty'

class DepartmentEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            department: {}
        }
    }
    componentDidMount() {
        axios.get(`/departments/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const department = response.data
                this.setState({ department })
            })
            .catch(err => {
                alert(err)
            })
    }

    handleSubmit = (formData) => {
        axios.put(`/departments/${this.props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                this.props.history.push(`/departments/${this.props.match.params.id}`)
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div className="container">
                <h2>Department Edit</h2>
                { !isEmpty(this.state.department) && <DepartmentForm handleSubmit={this.handleSubmit} department={this.state.department} /> }
            </div>
        )
    }
}

export default DepartmentEdit