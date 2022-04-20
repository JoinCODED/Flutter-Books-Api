const express = require('express');
const upload = require('../middlewares/multer');
const passport = require('passport');
const {
  getBooks,
  updateBook,
  deleteBook,
  createBook,
} = require('../controllers/booksController');

const router = express.Router();

router.get('/', getBooks);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  createBook
);
router.put('/:bookId', upload.single('image'), updateBook);
router.delete('/:bookId', deleteBook);

module.exports = router;
