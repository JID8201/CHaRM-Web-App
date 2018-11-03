const config = require('dotenv').config()
require('./backend/models/recycling')
require('./backend/models/user')
var cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3001
const path = require('path')


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection
const api = require('./backend/routes')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/')))
app.use('/api', api)
db.on('error', console.error.bind(console, 'connection error:'))

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })
} else {
  app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
  })
}

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
})
