require('dotenv').config()
require('./backend/models/recycling')
require('./backend/models/user')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3001
const path = require('path')
const passport = require('passport')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true
})

const db = mongoose.connection
const api = require('./backend/routes')

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/api', api)
db.on('error', console.error.bind(console, 'connection error:'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/static')))
  app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
  })
} else {
  app.get('/*', (req, res) => {
    app.use(express.static(path.join(__dirname, '/public')))
    res.sendFile(__dirname + '/public/index.html')
  })
}

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
})
