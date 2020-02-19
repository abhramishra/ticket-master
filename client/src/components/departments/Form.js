import React from 'react'
import { Form, Button } from 'reactstrap'

class DepartmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.department ? props.department.name : ''
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
            name: this.state.name
        }
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmitData}>
                    <br/><br/><h2><label htmlFor="name">Add Department</label></h2><br/>
                    <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} /><br/><br/>

                    {/* <input type="submit" /> */}
                    <Button color="secondary">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default DepartmentForm