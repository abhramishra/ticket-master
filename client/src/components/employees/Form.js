import React from 'react'
import axios from '../../config/axios'

class EmployeesForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            mobile: '',
            department: '',
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
            <div>
                <form onSubmit={this.handleSubmitData}>
                    <label htmlFor="name">Name</label><br/>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} /><br/>

                    <label htmlFor="name">Email</label><br/>
                    <input type="text" id="Email" name="email" value={this.state.Email} onChange={this.handleChange} /><br/>

                    <label htmlFor="name">Mobile</label><br/>
                    <input type="text" id="Mobile" name="mobile" value={this.state.Mobile} onChange={this.handleChange} /><br/>

                    <label htmlFor="department">Department</label><br/>
                    <select id="department" name="department" value={ this.state.department } onChange={ this.handleChange } >
                        <option>select department</option>
                        {
                            this.state.departments.map(dept => {
                                return <option key={dept._id} value={ dept._id }>{ dept.name }</option>
                            })
                        }
                    </select><br/>

                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default EmployeesForm