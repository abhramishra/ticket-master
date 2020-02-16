import React from 'react'
import axios from '../../config/axios'

class Logout extends React.Component {
    componentDidMount() {
        const confirm = window.confirm("Are you sure?")
        if (confirm){
            axios.delete('/users/logout', {headers: {
                'x-auth': localStorage.getItem('authToken')
            }})
            .then((response) => {
                const user = response.data
                localStorage.removeItem('authToken')
                this.props.history.push('/')
                window.location.reload()
            })
            .catch((err) => {
                alert(err)
            })
        }
        
    }
    render() {
        return (
            <div></div>
        )
    }
}

export default Logout

    