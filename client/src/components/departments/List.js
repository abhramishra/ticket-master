import React from 'react'
import DepartmentForm from './Form'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
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
                if (response.data.isDepartmentAttachedToTkt) {
                    alert("This department is attached to some other ticket, you can not delete")
                } else if (response.data.isDepartmentAttachedToEmp) {
                    alert("This department is attached to some other employee")
                } else {
                    this.setState(prevState => ({
                        departments: prevState.departments.filter(dept => dept._id != id)
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
                <h1>Department - { this.state.departments.length }</h1>
                <ListGroup>
                    {
                        this.state.departments.map(department => {
                            return (
                                <ListGroupItem key={department._id}>
                                    { department.name } 
                                    <div className="float-right">
                                        <Link to={`/departments/${department._id}`}><Button color="info" >Show</Button></Link>
                                        <Button color="danger" onClick={() => {
                                            this.handleRemove(department._id)
                                        }}>remove</Button>
                                    </div>
                                    
                                </ListGroupItem>
                            ) 
                        })
                    }
                </ListGroup>
                <DepartmentForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default DepartmentList