import React from 'react'
import EmployeeForm from './Form'
import axios from '../../config/axios'

class EmployeeNew extends React.Component {

    handleSubmit = (formData) => {
        axios.post('/employees',formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=> {
            console.log(response.data)
            if (response.data.errors) {
                alert(response.data.message)
            } else {
                this.props.history.push('/employees')
            }
        })
        .catch((err) => {
            alert(err)
        })
    }

    render() {
        return (
            <div>
                <EmployeeForm handleSubmit={ this.handleSubmit }/>
            </div>
        )
    }
}
export default EmployeeNew