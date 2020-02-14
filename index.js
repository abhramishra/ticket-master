const express = require('express')
const app = express()
const routes = require('./config/routes')
require('dotenv').config()
const port = process.env.PORT
const mongoose = require('./config/database')

app.use(express.json())

app.use('/', routes)
app.listen(port, () => {
    console.log('Listening to port', port)
})

