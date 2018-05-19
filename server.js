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
const keys = require('./config/keys');
require('./models/user')
require('./services/passport');

mongoose.connect(keys.mongoURI);

//app setup
app.use(morgan('combined'));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
router(app);
require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on', port);
