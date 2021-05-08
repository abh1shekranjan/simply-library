const { db_tables } = require('../config/db_config');
const mongoose = require('mongoose');
const { ERRORS } = require('../error');

/**
 * @description Borrow a book
 *
 * @param {object} req
 * @param {object} res
 */
function returnBook(req, res) {
  const users = mongoose.connection.collection(db_tables.USER_LIST);
  const books = mongoose.connection.collection(db_tables.BOOK_LIST);
  const { bookCopyId } = req.body;
  const email = req.user.email;
  const mandatoryFields = [bookCopyId];
  let User;
  Promise.resolve()
    .then(() => {
      // mandatory fields are missing
      if (mandatoryFields.includes(undefined)) {
        throw new Error(ERRORS.BAD_REQUEST);
      }
    })
    .then(() =>
      users.findOne({
        email: email,
      })
    )
    .then((result) => {
      if (!result) {
        throw new Error(ERRORS.USER_NOT_AUTHORIZED);
      } else {
        User = result;
        return books.findOne({ bookId: bookCopyId.split('/')[0] });
      }
    })
    .then((result) => {
      if (result) {
        // get first available copy
        for (let i in result.rack) {
          if (result.rack[i] === null) {
            result.rack[i] = bookCopyId;
            break;
          }
        }
        //changing bookCopyId status to not borrowed
        for (let i in result.bookCopy) {
          if (result.bookCopy[i].bookCopyId === bookCopyId) {
            result.bookCopy[i].isBorrowed = false;
            result.bookCopy[i].dueDate = null;
            break;
          }
        }
        // Updating Books Object
        return books.updateOne(
          { _id: result._id },
          { $set: { rack: result.rack, bookCopy: result.bookCopy } }
        );
      } else {
        throw new Error(ERRORS.BOOK_NOT_FOUND);
      }
    })
    .then((result) => {
      if (!result) {
        throw new Error(ERRORS.BAD_REQUEST);
      } else {
        //Removing book from borrowed books
        User.borrowedBooks = User.borrowedBooks.filter(
          (item) => item !== bookCopyId
        );
        return users.updateOne(
          { _id: User._id },
          { $set: { borrowedBooks: User.borrowedBooks } }
        );
      }
    })
    .then((result) => {
      if (!result) {
        throw new Error(ERRORS.BAD_REQUEST);
      } else {
        return res.status(200).json({ message: 'Book successfully returned' });
      }
    })
    .catch((e) => {
      console.log(e);
      if (e.message === ERRORS.BAD_REQUEST) {
        return res.status(400).send('Bad request');
      } else if (e.message === ERRORS.USER_NOT_AUTHORIZED) {
        return res.status(401).json({ msg: 'User not Authorized' });
      } else if (e.message === ERRORS.BOOK_NOT_FOUND) {
        return res.status(401).json({ msg: 'No Available books' });
      } else if (e.message === ERRORS.NO_AVAILABLE_BOOKS) {
        return res.status(401).json({ msg: 'No Available books' });
      } else {
        return res.status(500).send('Internal Error');
      }
    });
}

module.exports = {
  returnBook,
};
