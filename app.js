const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const { localStrategy, jwtStrategy } = require('./middlewares/passport');

const app = express();
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());
app.use('/media', express.static(path.join(__dirname, 'media')));
// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
// Routes
app.use('/books', booksRoutes);
app.use('/', usersRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json(err.message ?? { message: 'Internal Server Error.!' });
});
app.listen(process.env.PORT || 5000);
