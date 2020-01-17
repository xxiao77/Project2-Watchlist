var express = require('express');
const passport = require('passport')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login Page' });
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/movies',
    failureRedirect: '/',
  })
)
// OAuth logout route
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router;
