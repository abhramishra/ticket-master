import React from 'react'
import Select from 'react-select'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

class TicketForm extends React.Component {
    constructor(props) {
        console.log('form',props.ticket)
        super(props)
        this.state = {
            code: props.ticket ? props.ticket.code : '',
            customer: props.ticket ? props.ticket.customer : '',
            department: props.ticket ? props.ticket.department  : '',
            employee: props.ticket ? props.ticket.employees : [],
            message: props.ticket ? props.ticket.message : '',
            priority:  props.ticket ? props.ticket.priorities : '',
            customers: [],
            departments: [],
            employees: [],
            selectedEmployee: []

        }
    }

    componentDidMount() {

         // to get all the departments
        axios.get('/departments',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then((response) => {
             const departments =  response.data
             this.setState({departments})
         })
         .catch((err) => {
             alert(err)
         })
        // to get all the customers
        axios.get('/customers',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then((response) => {
             const customers =  response.data
             this.setState({customers})
         })
         .catch((err) => {
             alert(err)
         })
        
         // to get all the customers
         axios.get('/employees',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
         .then((response) => {
             const employees =  response.data
             console.log(employees)
             this.setState({employees})
         })
         .catch((err) => {
             alert(err)
         })
    }

    handleChange = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }

    handleCustomer = (optionSelected) => {
        const customer = optionSelected.value
        this.setState({ customer })
    }

    handleEmployee = (optionSelected) => {
        const employee = optionSelected.map(emp => emp.value)
        this.setState({ employee })
    }

    handleDepartment = (optionSelected) => {
        const department = optionSelected.value
        const selectedEmployee = this.state.employees.filter(employee => employee.department._id == department)
        this.setState({ selectedEmployee, department })
    }

    handleSubmitData = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.customer,
            department: this.state.department,
            employees: this.state.employee,
            message: this.state.message,
            priorities: this.state.priority
        }
        this.props.handleSubmit(formData)
    }

    render() {
        console.log(this.state.employee)
        let customerOptions = []
        let deptoptions = []
        let employeeOptions = []

        this.state.customers.forEach(emp => {
            const option = { value: emp._id, label: emp.name }
            customerOptions.push(option)
        })
        
        this.state.departments.forEach(dept => {
        deptoptions.push({ value: dept._id, label: dept.name })
        })

        this.state.selectedEmployee.forEach(emp => {
            employeeOptions.push({ value: emp._id, label: emp.name })
        })

        return (
            <div className="container">
                <Form onSubmit={this.handleSubmitData}>
                    <Label>Code</Label><br/>
                    <Input type="text" value={this.state.code} name="code" onChange={this.handleChange} /><br/>
                    <Label>Customer</Label><br/>
                    <Select options={customerOptions} onChange={this.handleCustomer} name="customer" disabled="true"/>
                    <Label>Department</Label>
                    <Select options={deptoptions} onChange={this.handleDepartment} id="dept"/>
                    <Label>Employee</Label>
                    <Select options={employeeOptions} isMulti onChange={this.handleEmployee} />
                    <Label>Mesage</Label><br/>
                    <Input type="textarea" row="10" cols="100" onChange={this.handleChange} name="message" value={this.state.message} /><br/>

                    <FormGroup tag="fieldset">
                        <legend>Priority</legend>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="priority" value="high" onChange={this.handleChange}/>{' '}
                                High
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="priority" value="medium" onChange={this.handleChange} />{' '}
                                Medium
                            </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                            <Label check>
                                <Input type="radio" name="priority" value="low" onChange={this.handleChange} />{' '}
                                Low
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <Button>Submit</Button>
                    <Link to="/tickets"> <Button>Back</Button></Link>
                </Form>
            </div>
        )
    }
}

export default TicketForm