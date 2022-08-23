const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router =require('./routes/book-routes')
require('dotenv').config()

const app = express()
url = 'mongodb+srv://Ziad:012440123@cluster0.plyz0.mongodb.net/bookStore'

const port = process.env.PORT || 5000
mongoose.connect(url).then(() => {
    console.log(`Connected To DataBase with ${port}`)
}).then(() => {
    app.listen(port)
}).catch(err => { console.log(err) })

app.set('view engine', 'ejs')
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))
// app.use('/home', router)
app.use('/', router)