"use strict";

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
