import React from 'react' 
import { Link } from 'react-router-dom'
import { Form, FormGroup, Button, Input, Label } from 'reactstrap'

class CustomerForm extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            name: props.customer ? props.customer.name : '',
            email: props.customer ? props.customer.email : '',
            mobile: props.customer ? props.customer.mobile : ''
        }
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
            mobile: this.state.mobile
        }
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmitData}>
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} placeholder="enter your name" />
                    </FormGroup> 
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="enter your email" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input type="text" id="mobile" name="mobile" onChange={this.handleChange} value={this.state.mobile} placeholder="enter your mobile number" />
                    </FormGroup>         
                    <Button color="secondary">Submit</Button>
                    <Link to="/customers"> <Button color="secondary">Back</Button></Link>
                </Form>
            </div>
        )
    }
}

export default CustomerForm