import express from 'express';
import formidable from 'express-formidable';

const app = express();
const db = require('./config/db.js');
const PORT = process.env.PORT || 7777;
const HOST = process.env.HOST || 'localhost';

const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  next();
}

app.use(formidable());
app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/email', require('./routes/email'));
app.use('/users', require('./routes/users'));

app.set('port', PORT);

app.listen(PORT, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});

app.get('/', (req, res) => {
  res.send(`Server listening on ${HOST}:${PORT}`);
});

module.exports = {
  path: '/server',
  handler: app
}
