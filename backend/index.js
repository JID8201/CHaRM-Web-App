// "use strict";
// require('dotenv').config({path: '../.env'});
// require('./models/recycling');
// require('./models/user');
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = process.env.PORT || 3001;
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URL);

// const db = mongoose.connection;
// const api = require('./routes');

// app.use(bodyParser.json());
// app.use('/api', api);
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     // connected
//     console.log('connected');
// });

// app.get('/*', (req, res) => {
//     res.send('Hello');
// });
  
// app.listen(PORT, error => {
//     error
//     ? console.error(error)
//     : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
// });