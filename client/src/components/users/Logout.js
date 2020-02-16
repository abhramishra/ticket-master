import axios from '../../config/axios'

axios.delete('/users/logout')
    .then((response) => {
        const user = response.data
        localStorage.removeItem('authToken')

    })
    .catch((err) => {
        alert(err)
    })
    