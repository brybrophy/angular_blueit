'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET;

const router = express.Router(); // eslint-disable-line new-cap

router.post('/api/token', (req, res, next) => {
  let user;

  knex('users')
    .where('username', req.body.username)
    .first()
    .then((row) => {
      console.log(row);
      if (!row) {
        throw boom.create(401, 'User could not be logged in');
      }

      user = camelizeKeys(row);

      return bcrypt.compare(req.body.password, user.hashedPassword);
    })
    .then(() => {
      const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3);
      const token = jwt.sign({ userId: user.id }, tokenSecret, {
        expiresIn: '3h'
      });

      res.cookie('accessToken', token, {
        httpOnly: true,
        expires: expiry,
        secure: router.get('env') === 'production'
      });
      res.cookie('loggedIn', true, {
        expires: expiry,
        secure: router.get('env') === 'production'
      });
      
      res.sendStatus(200);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(401, 'User could not be logged in');
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/api/token', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('loggedIn');
  res.sendStatus(200);
});

module.exports = router;
