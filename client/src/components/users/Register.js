import React from 'react'
import axios from '../../config/axios'
import { Button, Form, Input, Label } from 'reactstrap'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault() 
        const formData = {
            username: this.state.username, 
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)

        axios.post('/users/', formData)
         .then((response) => {
            if (response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                alert("Successfully Registered")
                this.props.history.push('/users/login')
            }
         })
         .catch((err) => {
             alert(err)
         })


    }

    render() {
        return (
            <div className="container">
                <h2>Sign up</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Enter the username" /> <br/>

                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter your email" /> <br />

                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="create a password" /> <br />

                    <Button>Register with us</Button>
                </Form>
            </div>
        )
    }
}

export default Register