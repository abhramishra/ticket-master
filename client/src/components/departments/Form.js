import React from 'react'

class DepartmentForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ''
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
            <div>
                <form onSubmit={this.handleSubmitData}>
                    <label htmlFor="name">Name</label><br/>
                    <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} /><br/>

                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default DepartmentForm