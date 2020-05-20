require('dotenv').config({ path: './config/config.env' })
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

connectDB()

const userRoutes = require('./routes/user')
const transactionsRoutes = require('./routes/transactions')

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(bodyParser.json())

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/transactions', transactionsRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

module.exports = app