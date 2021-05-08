const { db_tables } = require('../config/db_config');
const mongoose = require('mongoose');
const { ERRORS } = require('../error');

/**
 * @description Borrow a book
 *
 * @param {object} req
 * @param {object} res
 */
function borrowBook(req, res) {
  res.status(200).send('not implemented yet by Satadhi');
}

module.exports = {
  borrowBook,
};
