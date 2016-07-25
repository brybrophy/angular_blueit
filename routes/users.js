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

  if (!userName || !userName.trim()) {
    return next(boom.create(400, 'Username must not be blank'));
  }

  if (!password || !password.trim()) {
    return next(boom.create(400, 'Password must not be blank'));
  }

  if (!firstName || !firstName.trim()) {
    return next(boom.create(400, 'First name must not be blank'));
  }

  if (!lastName || !lastName.trim()) {
    return next(boom.create(400, 'Last name must not be blank'));
  }

  const newUser = { username, password, firstName, lastName };
  const row = camelizeKeys(newUser);

  knex('users')
    .select(knex.raw('1=1'))
    .where('username', userName)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(409, 'Username already exists');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashed_password) => knex('users').insert({ row }, '*')
    .then((newUsers) => {
      req.session.userId = newUsers[0].id;
      res.cookie('loggedIn', true);
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = Router;
