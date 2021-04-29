const { db_tables } = require('../config/db_config');
const mongoose = require('mongoose');
const { ERRORS } = require('../error');
const { uuid } = require('uuidv4');

/**
 * @description Add a book in the booklist
 * @param {object} req
 * @param {object} res
 */
function addBook(req, res) {
  // get the booklist db
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
      // incoming book has a pre-existing copy
      if (result) {
        return updateRecord(result, userCollection);
      } else {
        const bookId = uuid();
        const bookCopyId = bookId + '/' + uuid();
        return userCollection.insertOne({
          bookId: bookId,
          title: title,
          authors: authors,
          publisher: publisher,
          bookCopy: [
            {
              bookCopyId: bookCopyId,
              isBorrowed: false,
              dueDate: null,
            },
          ],
          rack: [bookCopyId],
        });
      }
    })
    .then((result) => {
      if (
        result.insertedCount === 1 ||
        (result.result ? result.result.ok : false)
      ) {
        console.log('book added successfully');
        return res
          .status(200)
          .json({ message: 'New book is added in the booklist' });
      } else {
        throw new Error(ERRORS.INTERNAL);
      }
    })
    .catch((e) => {
      if (e.message === ERRORS.BAD_REQUEST) {
        return res.status(400).send('Bad request');
      } else {
        return res.status(500).send('Internal error');
      }
    });
}

/**
 * @description update bookCopy with new bookCopyId and put the book in the available rack.
 * @param {object} record
 */
function updateRecord(record, userCollection) {
  // create new uuid for book copy
  const bookCopyId = record.bookId + '/' + uuid();
  let bookCopy = record.bookCopy;
  let rack = record.rack;
  let rackFlag = -1;

  // add new book in the bookcopy list
  bookCopy.push({
    bookCopyId: bookCopyId,
    isBorrowed: false,
    dueDate: null,
  });

  // check if any rack is empty then put the book in empty position
  for (let i in rack) {
    if (rack[i] == null || rack[i] === undefined) {
      rack[i] = bookCopyId;
      rackFlag = 0;
      break;
    }
  }

  // put the book at last.
  if (rackFlag === -1) rack.push(bookCopyId);

  return userCollection.updateOne(
    { _id: record._id },
    { $set: { rack: rack, bookCopy: bookCopy } }
  );
}

module.exports = {
  addBook,
};
