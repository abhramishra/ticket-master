import React from 'react' 
import axios from '../../config/axios'
import { Button, Form, Input, Label } from 'reactstrap'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)
        axios.post('/users/login', formData)
         .then((response) => {
             if (response.data.hasOwnProperty('error')) {
                 window.alert(response.data.error)
             } else {
                 const token = response.headers['x-auth']
                //  const token = response.headers['x-auth']
                 localStorage.setItem('authToken', token)
                 this.props.history.push('/')
                 window.location.reload()
             }
         })
    }

    render(){ 
        return (
            <div className="container">
                <h2>Login</h2>
                <Form onSubmit={this.handleSubmit}>  
                    <Label htmlFor="email">email</Label>
                    <Input type="text" placeholder="Enter your email id" id="email" name="email" value={this.state.email} onChange={this.handleChange} /><br/>

                    <Label htmlFor="password">password</Label>
                    <Input type="password" placeholder="Enter your password" id="password" name="password" value={this.state.password} onChange={this.handleChange} /><br/>

                    <Button>Login</Button>
                </Form>

            </div> 
        )
    }
}

export default Login