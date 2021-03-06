const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes');
const winston = require('./config/winston');

const config = {
  PORT: process.env.PORT || '9000',
  ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/learn-ar',
}

mongoose.connect(config.DB_URL, {useNewUrlParser: true});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan('combined', { stream: winston.stream }));

app.use('/api', routes);
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.ENV === 'development' ? err : {};
  
  if (err) {
    // add this line to include winston logging
    winston.error(err);
    // render the error page
    return res.status(err.status || 500).json({error: err.message,});
  }

  return next();
});

app.listen(config.PORT, () => {
  console.log(`starting ${config.ENV} server at http://localhost:${config.PORT}`);
});
