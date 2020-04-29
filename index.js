const express = require('express')
const mongoose = require('./config/database')
const routes = require('./config/routes')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
//require('dotenv').config()
const path = require('path')

const corsOptions = { exposedHeaders: 'x-auth' }    // to exposed the x-auth token in the response headers

app.use(express.json())
app.use(cors())
app.use(cors(corsOptions))

app.use('/', routes)
if ( process.env.NODE_ENV == "production" ) {
    app.use(express.static(path.join(__dirname,"client/build"))) 
    app.get("*",(req,res) => { 
        res.sendFile(path.join(__dirname + "/client/build/index.html")) 
    }) 
}

app.listen(port, () => {
    console.log('Listening to port', port)
})


