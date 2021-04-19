const { db_tables } = require('../config/db_config');
const mongoose = require('mongoose');
const { ERRORS } = require('../error');
// @route    POST /search-book
// @desc     Search for a given book and return its book copy ids
// @access   Private
function searchBook(req, res) {
  const userCollection = mongoose.connection.collection(db_tables.BOOK_LIST);
  const { title, authors, publisher } = req.body;

  // define mandatoryFields
  const mandatoryFields = [title, authors, publisher];

  Promise.resolve()
    .then(() => {
      // mandatory fields are missing
      if (mandatoryFields.includes(undefined)) {
        throw new Error(ERRORS.BAD_REQUEST);
      }
    })
    .then(() =>
      userCollection.findOne({
        title: title,
        authors: authors,
        publisher: publisher,
      })
    )
    .then((result) => {
      if (result) {
        //if book is found then return the book copies
        res.json(result.bookCopy);
      } else {
        // throw a custom error
        throw new Error(ERRORS.BOOK_NOT_FOUND);
      }
    })
    .catch((e) => {
      if (e.message === ERRORS.BAD_REQUEST) {
        return res.status(400).send('Bad request');
      } else if (e.message === ERRORS.BOOK_NOT_FOUND) {
        return res.status(404).send('Book Not Found');
      } else {
        return res.status(500).send('Internal Error');
      }
    });
}

module.exports = {
  searchBook,
};
