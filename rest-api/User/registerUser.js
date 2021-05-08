const { db_tables } = require('../config/db_config');
const mongoose = require('mongoose');
const { ERRORS } = require('../error');
const jwt = require('jsonwebtoken');
const config = require('config');
const CryptoJS = require('crypto-js');
const SHA256 = require('crypto-js/sha256');

/**
 * @description Register a User
 * @param {object} req
 * @param {object} res
 */

function registerUser(req, res) {
  // get the user db
  const users = mongoose.connection.collection(db_tables.USER_LIST);
  const { name, email, password } = req.body;

  // define mandatoryFields
  const mandatoryFields = [name, email, password];

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
      //console.log(result);

      // user already exists
      if (result) {
        console.log(ERRORS.USER_ALREADY_EXISTS);
        throw new Error(ERRORS.USER_ALREADY_EXISTS);
      } else {
        //Encrypting the password using crypto js
        // let userPassword = CryptoJS.AES.encrypt(
        //   password,
        //   config.get('jwtSecret')
        // ).toString();

        return users.insertOne({
          name: name,
          email: email,
          password: SHA256(password).toString(), // encryptedPassword
          borrowedBooks: [],
        });
      }
    })
    .then((result) => {
      if (
        result.insertedCount === 1 ||
        (result.result ? result.result.ok : false)
      ) {
        const payload = { id: result.ops[0]._id };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw new Error(ERRORS.TOKEN_ERROR);
            res.json({ token });
          }
        );
      } else {
        throw new Error(ERRORS.INTERNAL);
      }
    })
    .catch((e) => {
      console.log(e, e.message);
      if (e.message === ERRORS.BAD_REQUEST) {
        return res.status(400).send('Bad request');
      } else if (e.message === ERRORS.USER_ALREADY_EXISTS) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      } else {
        return res.status(500).send('Internal error');
      }
    });
}

module.exports = {
  registerUser,
};
