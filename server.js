const config = require('dotenv').config();
require('./backend/models/recycling');
require('./backend/models/user');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
const api = require('./backend/routes');

app.use(bodyParser.json());
app.use('/api', api);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // connected
    console.log('connected');
});

app.get('/*', (req, res) => {
    res.send('Hello');
});
  
app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});