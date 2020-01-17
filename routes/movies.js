var express = require('express');
var router = express.Router();

// var axios = require('axios');

const moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.index);
router.post('/', moviesCtrl.create);
// router.get('/new', moviesCtrl.newMovies);

module.exports = router;