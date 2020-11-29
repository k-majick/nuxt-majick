const mongoose = require('mongoose');
const connection = process.env.DB;

mongoose.Promise = require('bluebird');
mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    promiseLibrary: require('bluebird')
  })
  .then(() => console.log(`Database connected to ${connection}`))
  .catch((err) => console.log(`Database error: ${err}`));
