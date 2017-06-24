const express = require('express');
const app = express();
const morgan = require('morgan');
const juices = require('./routes/juices');
const ingredients = require('./routes/ingredients');
const errorHandler = require('./error-handler');


app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header["x-forward-proto"] === 'https') next(); //eslint-disable-line
    else res.redirect(`http://${req.hostname}${req.url}`);
  });
}

app.use((req, res, next) => {
  console.log('setting cors headers'); //eslint-disable-line
  const url = '*';
  res.header('Access-Control-Allow-Origin', url);
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.static('../public'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join('../public', 'build', 'index.html'));
// });
app.use('/api/juices', juices);
app.use('/api/ingredients', ingredients);

app.use(errorHandler);

module.exports = app;