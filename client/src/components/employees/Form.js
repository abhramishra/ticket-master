import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Input, Label, Button  } from 'reactstrap'

class EmployeesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.employee ? props.employee.name : '',
            email: props.employee ? props.employee.email : '',
            mobile: props.employee ? props.employee.mobile : '',
            department: props.employee ? props.employee.department : '',
            departments: []            
        }
    }
    componentDidMount() {
        axios.get('/departments',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then ((response) => {
             const departments = response.data
             this.setState({departments})
         })
         .catch((err) => {
             alert(err)
         })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitData = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div className="container">
                <h2>Add new employee</h2>
                <Form onSubmit={this.handleSubmitData}>
                    <Label htmlFor="name">Name</Label><br/>
                    <Input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} /><br/>

                    <Label htmlFor="name">Email</Label><br/>
                    <Input type="text" id="Email" name="email" value={this.state.email} onChange={this.handleChange} /><br/>

                    <Label htmlFor="name">Mobile</Label><br/>
                    <Input type="text" id="Mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} /><br/>

                    <Label htmlFor="department">Department</Label><br/>
                    <Input type="select" id="department" name="department" value={ this.state.department } onChange={ this.handleChange } >
                        <option>select department</option>
                        {
                            this.state.departments.map(dept => {
                                return <option key={dept._id} value={ dept._id }>{ dept.name }</option>
                            })
                        }
                    </Input><br/>

                    <Button>Submit</Button>
                    <Link to="/employees"> <Button>Back</Button></Link>
                </Form>
            </div>
        )
    }
}

export default EmployeesForm