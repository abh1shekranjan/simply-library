const { db_tables } = require('../config/db_config');
const mongoose = require('mongoose');
const { ERRORS } = require('../error');

function listUserBook(req, res) {
  const user = mongoose.connection.collection(db_tables.USER_LIST);
  Promise.resolve()
    .then(() => {
      users.findOne({
        userId: req.user.id,
      });
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({ msg: 'User not Authorized' });
      } else {
        res.json(result.borrowedBooks);
      }
    })
    .catch((e) => {
      if (e.message === ERRORS.BAD_REQUEST) {
        return res.status(400).send('Bad request');
      } else {
        return res.status(500).send('Internal Error');
      }
    });
}

module.exports = {
  listUserBook,
};
