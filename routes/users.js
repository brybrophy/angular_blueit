'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

const ev = require('express-validation');
const validations = require('../validations/users');

const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');

const checkAuth = function(req, res, next) {
  if (!req.session.userId) {
    return next(boom.create(401, 'Unauthorized'));
  }

  next();
};

router.post('/users', ev(validations.post), (req, res, next) => {
  const { username, password, firstName, lastName} = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('username', username)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(409, 'Username already exists');
      }

      return bcrypt.hash(password, 12);

    })
    .then((hashedPassword) => {
      const newUser = { username, hashedPassword, firstName, lastName };
      const row = decamelizeKeys(newUser);

      return knex('users').insert(row, '*')
    })
    .then((newUsers) => {
      delete newUsers[0].hashedPassword;

      req.session.userId = newUsers[0].id;
      res.cookie('loggedIn', true);
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
