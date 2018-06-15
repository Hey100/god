const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const cloudinary = require('cloudinary');
const path = require('path');
const keys = require('../config/keys');
const pools = require('../controllers/pools');
const requireAuth = passport.authenticate('jwt', { session: false });

const Pool = mongoose.model('pools');

cloudinary.config({
  cloud_name: 'ethanyjoh',
  api_key: '573798653617485',
  api_secret: keys.cloudinarySecretKey
});

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

module.exports = app => {
  //get
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
    let obj = {};
    obj['amount'] = pool.amount;
    obj['contributors'] = pool.numOfContributors;
    obj['startDate'] = pool.startDate;
    obj['rate'] = pool.rate;
    res.send({ pool, obj });
  });

  //post
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
};
