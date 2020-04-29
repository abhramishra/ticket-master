const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const configureDB = () => {
    const CONNECTION_URI= process.env.MONGODB_URI || "mongodb://localhost:27017/ticket-master-bk"
    mongoose.connect(CONNECTION_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    console.log('Mongo URI --------------------', process.env.MONGODB_URI)
        .then(()=>{
            console.log('succesfully connected to db')
        })
        .catch(()=>{
            console.log('error connecting to db')
        })
}
                          
module.exports = configureDB