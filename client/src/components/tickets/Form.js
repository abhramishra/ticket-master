import React from 'react'
import Select from 'react-select'
import axios from '../../config/axios'
class TicketForm extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            customers: [],
            departments: [],
            employees: [],
            abc: ['a','b','c']

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



        // function getCustomers() {
        //     return new Promise((resolve, reject) => {
        //         axios.get('/customers',{
        //             headers: {
        //                 'x-auth': localStorage.getItem('authToken')
        //             }
        //         })
        //     })
        // }
        // function getDepartments() {
        //     return new Promise((resolve, reject) => {
        //         axios.get('/departments',{
        //             headers: {
        //                 'x-auth': localStorage.getItem('authToken')
        //             }
        //         })
        //     })
        // }
        // function getEmployee() {
        // }

        // Promise.all([ getCustomers(), getDepartments() ])
        //     .then((values) => {
        //         const [ customers, departments ] = values
        //         console.log('customer details',customers)
        //     })
        //     .catch((err) => {
        //         alert(err)
        //     })
    }

    render() {
        return (
            <div>
                <form>
                    <label>Code</label><br/>
                    <input type="text" value={this.state.code} name="code" onChange={this.handleChange} /><br/>
                    <label>Customer</label><br/>
                    

                    {/* <Select 
                        name="customer"
                        placeholder="Select"
                        value={this.state.employee}
                        options={this.state.abc}
                        isMulti
                    /> */}
                </form>
            </div>
        )
    }
}

export default TicketForm