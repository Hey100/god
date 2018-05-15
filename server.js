const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(
  'mongodb://Michael:pe0pool@ds163689.mlab.com:63689/peopool'
);

//app setup
app.use(morgan('combined'));
app.use('/uploads', express.static('uploads'))
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['lakjhgahlkjglwkjoj98473']
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
router(app);

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on', port);
