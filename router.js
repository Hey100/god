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

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'ethanyjoh',
  api_key: '573798653617485',
  api_secret: '0aiBfSgi6S9Zl49PaAjQfYTr_6o'
});
//multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './client/src/uploads/',
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
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

module.exports = function(app) {
  //get

  //auth
	app.get('/api/current_user', requireAuth, (req, res) => {
    res.send(req.user);
	});
	app.get('/api/google_user',(req, res) => {
    res.send(req.user);
	});
	app.get('/api/jwt', requireAuth, (req, res) => {
		res.send(req.user)
	});
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
  //pools
	app.get('/api/mypools', requireAuth, async (req, res) => {
    const pools = await Pool.find({
      $or: [
        { contributors: { $elemMatch: { _user: req.user._id } } },
        { _user: req.user._id }
      ]
    });
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
	app.get('/api/payments', requireAuth, async (req, res) => {
    const payments = await Payment.find({ _user: req.user.id });
    res.send(payments);
  });

  //post

  //comments
	app.post('/api/saveComment', requireAuth, comments.create);
  //payments
	app.post('/api/createPayment', requireAuth, payments.create);
	app.post('/api/calculateLimit', requireAuth, payments.calculate);
  //pools
	app.post('/api/createPool', requireAuth, pools.create);
  app.post('/api/upload', (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.send({ err: 'Error: Image Files Only!' });
      } else {
        cloudinary.v2.uploader.upload(
          req.file.path,
          { width: 500, height: 500, crop: 'limit' },
          (error, result) => {
            if (error) {
              res.send(error);
            }
            res.send(result);
          }
        );
      }
    });
  });
	app.post('/api/joinPool', requireAuth, pools.join);
  //auth
	app.post('/api/signin', requireSignin, authentication.signin);
  app.post('/api/signup', authentication.signup);
	app.post('/api/updateUser', requireAuth, authentication.update);
};
