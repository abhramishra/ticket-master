import React from 'react'
import DepartmentForm from './Form'
import axios from '../../config/axios'

class DepartmentList extends React.Component {
    constructor() {
        super()
        this.state = {
            departments: []
        }
    }

    componentDidMount() {
        axios.get('/departments', { 
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const departments = response.data 
            this.setState({ departments })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleSubmit = (formData) => {
        axios.post('/departments',formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const department = response.data
            this.setState(prevState => ({
                departments: prevState.departments.concat(department)
            }))
        })
        .catch((err) => {
            alert(err)
        })
    }


    handleRemove = (id) => {
        const confirm = window.confirm('Are you sure ?')
        if (confirm) {
            axios.delete(`/departments/${id}`,{
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
            .then((response) => {
                const department = response.data
                this.setState(prevState => ({
                    departments: prevState.departments.filter(dept => dept._id != department._id)
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
                <h1>Department - { this.state.departments.length }</h1>
                <ul>
                    {
                        this.state.departments.map(department => {
                            return <li key={department._id}>{ department.name } <button onClick={() => {
                                this.handleRemove(department._id)
                            }}>remove</button></li>
                        })
                    }
                </ul>
                <DepartmentForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default DepartmentList