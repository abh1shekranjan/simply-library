const { db_tables } = require('../config/db_config');
const mongoose = require('mongoose');
const { ERRORS } = require('../error');
const config = require('config');
const CryptoJS = require('crypto-js');

async function loginUser(req, res) {
  try {
    const users = await mongoose.connection.collection(db_tables.USER_LIST);
    const { email } = req.body;
    const user = await users.findOne({
      email: email,
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  loginUser,
};
