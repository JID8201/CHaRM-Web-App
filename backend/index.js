"use strict";
var admin = require("firebase-admin");
var serviceAccount = require("./charm-f4f06-firebase-adminsdk-a15sk-443f9222bb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://charm-f4f06.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("orders/")

// example of how to get the data a process it
ref.on('value', function(snapshot) {
  var data = snapshot.val();
  var keys = Object.keys(data);
  console.log(data);
})


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/*', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
