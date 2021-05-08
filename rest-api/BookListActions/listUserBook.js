const { db_tables } = require('../config/db_config');
const mongoose = require('mongoose');
const { ERRORS } = require('../error');
/**
 * @description List all borrowed books of a user
 *
 * @param {object} req
 * @param {object} res
 */

function listUserBook(req, res) {
  const users = mongoose.connection.collection(db_tables.USER_LIST);
  Promise.resolve()
    .then(() =>
      users.findOne({
        email: req.user.email,
      })
    )
    .then((result) => {
      console.log(result);
      if (!result) {
        throw new Error(ERRORS.USER_NOT_AUTHORIZED);
      } else {
        res.json(result.borrowedBooks);
      }
    })
    .catch((e) => {
      console.log(e);
      if (e.message === ERRORS.BAD_REQUEST) {
        return res.status(400).send('Bad request');
      } else if (e.message === ERRORS.USER_NOT_AUTHORIZED) {
        return res.status(401).json({ msg: 'User not Authorized' });
      } else {
        return res.status(500).send('Internal Error');
      }
    });
}

module.exports = {
  listUserBook,
};
