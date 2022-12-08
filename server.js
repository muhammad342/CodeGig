const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
// 1 option
// const dotenv = require('dotenv')
// 2 option
require('dotenv').config()
const db = require('./config/db')
const gigs = require('./routes/gigs')

const app = express()

// 1 option dotenv initiate
// dotenv.config()

//body parser 
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// use of async await
// const connect = async () => {
//     try {
//         await db.authenticate()
//         console.log('db connected')
//     } catch (error) {
//         console.error(error)
//     }
// }

// connect()

// with promise
db.authenticate().then(() => console.log('db is connected....')).catch((err) => console.error(err))

//index 
app.get('/', (req, res) => {
    res.render('index', { layout: 'landing' })
})

// Gig routes
app.use('/gigs', gigs)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})
