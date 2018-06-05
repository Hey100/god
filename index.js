const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
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
require('./routes/authRoutes')(app);
require('./routes/commentRoutes')(app);
require('./routes/paymentRoutes')(app);
require('./routes/poolRoutes')(app);
require('./routes/profileRoutes')(app);
require('./routes/settingsRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
} 

const port = process.env.PORT || 5000;
app.listen(port);
console.log('Server listening on', port);
