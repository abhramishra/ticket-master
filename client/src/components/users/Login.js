import React from 'react' 
import axios from '../../config/axios'

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
                //  const token = response.headers['x-auth']
                 const token = response.data
                 localStorage.setItem('authToken', token)
                 this.props.history.push('/')
                 window.location.reload()
             }
         })
    }

    render(){ 
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>  
                    <label htmlFor="email">email</label>
                    <input type="text" placeholder="Enter your email id" id="email" name="email" value={this.state.email} onChange={this.handleChange} /><br/>

                    <label htmlFor="password">password</label>
                    <input type="password" placeholder="Enter your password" id="password" name="password" value={this.state.password} onChange={this.handleChange} /><br/>

                    <input type="submit" value="Login" />
                </form>

            </div> 
        )
    }
}

export default Login