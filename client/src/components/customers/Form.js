import React from 'react' 

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
            <div>
                <form onSubmit={this.handleSubmitData}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} /><br/>

                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} /><br/>

                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" id="mobile" name="mobile" onChange={this.handleChange} value={this.state.mobile} /><br/>

                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default CustomerForm