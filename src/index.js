const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config')
const User = require('./models/User')
const api = require('./routes/api')

//config
app.set('port',process.env.PORT || 3000)
mongoose.connect(config.database,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false
}).then(db =>console.log('db is connected'))
.catch(err =>console.log(err))

app.set('supersecret',config.secret)
//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))

//routes
app.get('/',(req,res)=>{
    res.send('hola json web token')
})
app.get('/setup',(req,res)=>{
    const user = new User({
        name:"luis",
        password:"123456",
        admin:true
    })
    user.save((err)=>{
        if(err) throw err;
        res.send("creado con exito")
    })
})
app.use('/api',api)
//starting the server
app.listen(app.get('port'),()=>{
    console.log(`server on http://localhost:${app.get('port')}`)
    
})