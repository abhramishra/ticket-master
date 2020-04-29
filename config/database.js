const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const CONNECTION_URI= process.env.MONGODB_URI || "mongodb://localhost:27017/ticket-master-bk"
mongoose.connect('mongodb+srv://abhra:secret123@cluster0-tzrg0.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: false})
// console.log('Mongo URI --------------------', process.env.MONGODB_URI)
    .then(()=>{
        console.log('succesfully connected to db')
    })
    .catch((err)=>{
        console.log('error connecting to db', err)
    })

                          
module.exports = mongoose