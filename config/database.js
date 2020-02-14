const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/ticket-master', { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {
    console.log('connected to db')
})
.catch(() => {
    console.log('faileds')
})

module.exports = mongoose