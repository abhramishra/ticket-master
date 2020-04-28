// const express = require('express')
// const app = express()
// const routes = require('./config/routes')
// const cors = require('cors')
// require('dotenv').config()
// const path = require('path')

// const port = process.env.PORT || 3000
// const configureDB = require('./config/database')
// configureDB()
// const corsOptions = { exposedHeaders: 'x-auth' }    // to exposed the x-auth token in the response headers

// app.use(express.json())
// app.use(cors())
// app.use(cors(corsOptions))
// app.use(express.static(path.join(__dirname,"client/build"))) 

// app.use('/', routes)

// app.get("*",(req,res) => { 
//     res.sendFile(path.join(__dirname + "/client/build/index.html")) 
// }) 
// app.listen(port, () => {
//     console.log('Listening to port', port)
// })

const express=require('express')
const configureDB=require('./config/database')
const router=require('./config/routes')
const cors=require('cors')
const path=require('path')
const port=process.env.PORT || 3030;
const app=express()
configureDB()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, './client/build/')))
app.use('/api',router)
app.get('*',(req,res)=> {
res.sendFile(path.join(__dirname,'./client/build/index.html'));
});
app.listen(port,()=>{
console.log('listening port:',port)
})

