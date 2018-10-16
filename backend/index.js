var firebase = require("firebase-admin");
var serviceAccount = require("./charm-f4f06-firebase-adminsdk-a15sk-443f9222bb.json");
const express = require('express');
const  bodyParser = require('body-parser');

//Initialize Firebase app
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://charm-f4f06.firebaseio.com"
});

var database = firebase.database();
var ordersRef = database.ref("orders/");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Retrieve orders by material type
app.get('/material/:type',
  (req, res) => {
    const type = String(req.params.type);

    var output;
    ordersRef.orderByChild("materialType").equalTo(type)
      .on("value", function(snapshot) {
        output = snapshot.val();
      });
    res.send(output);
  }
);

// Retrieve orders by originating zip code
app.get('/location/:zip',
  (req, res) => {
    const zipCode = parseInt(req.params.zip);

    var output;
    ordersRef.orderByChild("zipCode").equalTo(zipCode)
      .on("value", function(snapshot) {
        output = snapshot.val();
      });
    res.send(output);
  }
);

// Retrieve orders placed on a given day
app.get("/date/:year-month-day",
  (req, res) => {
    const date = parseInt(req.params.year-month-day);

    var output;
    ordersRef.orderByChild("timeStamp").equalTo(date)
      .on("value", function(snapshot) {
        output = snapshot.val();
      });
    res.send(output);
  }
);

// Retrieve orders placed within a given day range
app.get("/date/:from_ymd/:to_ymd",
  (req, res) => {
    const from_date = parseInt(req.params.from_ymd);
    const to_date = parseInt(req.params.to_ymd)

    var output;
    ordersRef.orderByChild("timeStamp").startAt(from_date)
      .endAt(to_date).on("value", function(snapshot) {
        output = snapshot.val();
      });
    res.send(output);
  }
);

// Retrieve orders by amount lower and upper bounds
app.get('/amount/:lower/:upper',
  (req, res) => {
    const lowerBound = parseInt(req.params.lower, 10);
    const upperBound = parseInt(req.params.upper, 10);
    
    var output;
    ordersRef.orderByChild("amount").startAt(lowerBound)
      .endAt(upperBound).on("value", function(snapshot) {
        output = snapshot.val();
      });
    res.send(output);
  }
);

// Retrieve all data in the database
app.get("/all",
  (req, res) => {
    var output;
    ordersRef.on("value", function(snapshot) {
        output = snapshot.val();
      });
    res.send(output);
  }
);

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
