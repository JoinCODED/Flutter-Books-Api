let users = require('../users');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await users.push(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + 9000000, // the token will expire 15 minutes from when it's generated
    };
    const token = jwt.sign(JSON.stringify(payload), 'asupersecretkey');
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      id: user.id,
      username: user.username,
      exp: Date.now() + 9000000, // the token will expire 15 minutes from when it's generated
    };
    const token = jwt.sign(JSON.stringify(payload), 'asupersecretkey');
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    res.json(users);
  } catch (error) {
    next(error);
  }
};
