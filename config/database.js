const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const CONNECTION_URI= process.env.MONGODB_URI || "mongodb://localhost:27017/ticket-master-bk"
mongoose.connect('mongodb+srv://abhra:secret123@helpdesk-cluster-ovx0p.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
// console.log('Mongo URI --------------------', process.env.MONGODB_URI)
    .then(()=>{
        console.log('succesfully connected to db')
    })
    .catch((err)=>{
        console.log('error connecting to db', err)
    })

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
                          
module.exports = mongoose