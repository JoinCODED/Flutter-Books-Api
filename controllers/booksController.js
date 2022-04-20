let data = require('../data');
const multer = require('multer');
// const slugify = require('slugify');

exports.getBooks = async (req, res, next) => {
  try {
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    let book = req.body;
    book.id = data[data.length - 1].id + 1;
    book.price = +book.price;

    data.push(book);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = data.find((book) => book.id === +req.params.bookId);
    if (!book) {
      res.status(404).json({ message: 'Book not found' }).end();
    } else {
      data = data.filter((book) => book.id !== +req.params.bookId);
      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    const book = data.find((book) => book.id === +req.params.bookId);
    if (!book) {
      res.status(404).json({ message: 'Book not found' }).end();
    } else {
      const newBook = req.body;
      newBook.id = +req.params.bookId;
      data = data.map((book) =>
        book.id === +req.params.bookId ? newBook : book
      );
      res.status(201).json(newBook);
    }
  } catch (error) {
    next(error);
  }
};
