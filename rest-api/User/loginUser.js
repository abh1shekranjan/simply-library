const { db_tables } = require('../config/db_config');
const mongoose = require('mongoose');
const { ERRORS } = require('../error');
const config = require('config');
const CryptoJS = require('crypto-js');
const SHA256 = require('crypto-js/sha256');
/**
 * @description Login a user
 * @param {object} req
 * @param {object} res
 */
async function loginUser(req, res) {
  try {
    const users = await mongoose.connection.collection(db_tables.USER_LIST);
    const { email, password } = req.body;
    const mandatoryFields = [email, password];
    if (mandatoryFields.includes(undefined)) {
      throw new Error(ERRORS.BAD_REQUEST);
    }
    const user = await users.findOne({
      email: email,
      password: SHA256(password).toString(), // missing checks for mandatory fields
    });
    if (user) {
      //sending access token
      jwt.sign(
        user._id,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw new Error(ERRORS.INTERNAL);
          res.json(
            Object.assign(user, { message: 'login success', token: token })
          );
        }
      );
      // TODO need to send accesstoken
      //console.log('user found', user);
    } else {
      throw new Error(ERRORS.USER_NOT_AUTHORIZED);
    }
  } catch (err) {
    if (err.message === ERRORS.USER_NOT_AUTHORIZED) {
      return res.status(401).send('Email or password is incorrect');
    } else if (err.message === ERRORS.BAD_REQUEST) {
      return res.status(400).send('Bad request');
    } else {
      res.status(500).send('Server Error');
    }
    console.error(err);
  }
}

module.exports = {
  loginUser,
};
