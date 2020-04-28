const mongoose = require('mongoose')
mongoose.Promise = global.Promise
// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
const configureDB = () => {
    const CONNECTION_URI= process.env.MONGODB_URI || "mongodb://localhost:27017/ticket-master-bk"
    mongoose.connect(CONNECTION_URI,{useNewUrlParser: true})
    .then(()=>{
        console.log('succesfully connected to db')
    })
    .catch(()=>{
        console.log('error connecting to db')
    })
}
                          
module.exports = configureDB