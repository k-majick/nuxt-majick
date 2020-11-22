import express from 'express';
import formidable from 'express-formidable';

const app = express();
const port = process.env.PORT;
const host = process.env.HOST || 'localhost';
const email = require('./routes/email');
const config = require('../nuxt.config');

app.use(formidable());
app.use('/email', email);

module.exports = {
  path: '/server',
  handler: app
}

app.listen((port, host) => {
  console.log('Server listening on `' + host + ':' + port + '`.')
});
