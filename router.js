const mongoose = require('mongoose');
const passport = require('passport');
const passportServer = require('./services/passport');
const path = require('path');
//controllers
const authentication = require('./controllers/authentication');
const pools = require('./controllers/pools');
const payments = require('./controllers/payments');
const comments = require('./controllers/comments');
//models
const Pool = mongoose.model('pools');
const Comment = mongoose.model('comments');
const Payment = mongoose.model('payments');

var multer = require('multer');
const storage = multer.diskStorage({
  destination: './client/src/uploads/',
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('err');
  }
}

const requireSignin = passport.authenticate('local', { session: true });

module.exports = function(app) {
  //get

  //auth
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
  //pools
  app.get('/api/mypools', async (req, res) => {
    const pools = await Pool.find({ $or: [
      {contributors: { $elemMatch: { _user: req.user._id } }},
			{ _user: req.user._id }
		]
		});
		console.log(pools, '11111111111111111111111')
    res.send(pools);
  });
  app.get('/api/allpools', async (req, res) => {
    const pools = await Pool.find({});
    res.send(pools);
  });
  app.get('/api/fetchPool/:id', async (req, res, done) => {
    const pool = await Pool.findById({ _id: req.params.id });
    res.send(pool);
  });
  //comments
  app.get('/api/comments/:id', async (req, res) => {
    const comments = await Comment.find({ _pool: req.params.id });
    res.send(comments);
  });
  //payments
  app.get('/api/payments', async (req, res) => {
    const payments = await Payment.find({ _user: req.user.id });
    res.send(payments);
  });

  //post

  //comments
  app.post('/api/saveComment', comments.create);
  //payments
  app.post('/api/createPayment', payments.create);
  app.post('/api/calculateLimit', payments.calculate);
  //pools
  app.post('/api/createPool', pools.create);
  app.post('/api/upload', (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.send({ err: 'Error: Image Files Only!' });
      } else {
        res.send({ file: `./uploads/${req.file.filename}` });
      }
    });
  });
  app.post('/api/joinPool', pools.join);
  //auth
  app.post('/api/login', requireSignin, authentication.signin);
  app.post('/api/signup', authentication.signup);
  app.post('/api/updateUser', authentication.update);
};
