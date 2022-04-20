const JWTStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;
const users = require('../users');

const LocalStrategy = require('passport-local').Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await users.find((user) => user.username === username);

    let passwordsMatch;

    if (user) {
      passwordsMatch = password === user.password;
    } else {
      passwordsMatch = false;
    }
    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

async (jwtPayload, done) => {
  if (Date.now() > jwtPayload.exp) {
    return done(null, false); // this will throw a 401
  }
  try {
    const user = await users.find((user) => +user.id === +jwtPayload.id);
    done(null, user); // if there is no user, this will throw a 401
  } catch (error) {
    done(error);
  }
};

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: 'asupersecretkey',
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await users.find((user) => user.id === jwtPayload.id);
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
