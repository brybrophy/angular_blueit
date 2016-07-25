'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

const ev = require('express-validation');
const validations = require('../validations/users');

const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.post('/users', ev(validations.post), (req, res, next) => {
  const { username, password, firstName, lastName} = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('username', username)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.conflict('Username already exists');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const newUser = { username, hashedPassword, firstName, lastName };
      const row = decamelizeKeys(newUser);

      return knex('users').insert(row, '*');
    })
    .then((newUsers) => {
      delete newUsers[0].hashed_password;
      delete newUsers[0].id;

      req.session.userId = newUsers[0].id;
      res.cookie('loggedIn', true);
      res.status(200);
      res.send(newUsers[0]);
    })
    .catch((err) => {
      next(boom.wrap(err));
    });
});

module.exports = router;
