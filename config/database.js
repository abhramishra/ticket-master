// const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
const configureDB = () => {
    const MongoClient = require('mongodb').MongoClient;

    const CONNECTION_URI= process.env.MONGODB_URI || "mongodb://localhost:27017/ticket-master-bk"
    const client = new MongoClient(CONNECTION_URI, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
      });
    // mongoose.connect(CONNECTION_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    // console.log('Mongo URI --------------------', process.env.MONGODB_URI)
    //     .then(()=>{
    //         console.log('succesfully connected to db')
    //     })
    //     .catch(()=>{
    //         console.log('error connecting to db')
    //     })
}
                          
module.exports = configureDB