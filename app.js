const config = require('./config/app');

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const api = require('./routes/api')

// MongoDB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useNewUrlParser: true,  useUnifiedTopology: true}).then (
  () => {
    console.log(`Server listening at http://localhost:${config.port}`);
    console.log(`Connected to ${config.database}`);
    console.log('App is running ...');
    console.log('Press CTRL + C to stop the process.');
  },
  err => {
    console.log(`Can not connect to the database : ${err}`)
  }
);

// Express
const app = express();

app.use(cors()); // Permit cross-origin connection
app.use(compression()); // Compress with gzip
app.use('/api', api); // Use the route file

app.listen(config.port);
