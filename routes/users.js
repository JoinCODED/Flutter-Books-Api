const express = require('express');
const router = express.Router();
const { signUp, signIn, getUsers } = require('../controllers/usersController');
const passport = require('passport');

router.get('/users', getUsers);
router.post('/signup', signUp);
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  signIn
);

module.exports = router;
