const express = require('express')
const app = express()
const routes = require('./config/routes')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT
const mongoose = require('./config/database')

const corsOptions = { exposedHeaders: 'x-auth' }    // to exposed the x-auth token in the response headers

app.use(express.json())
app.use(cors())
app.use(cors(corsOptions))

app.use('/', routes)
app.listen(port, () => {
    console.log('Listening to port', port)
})

