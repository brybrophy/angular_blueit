'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

const ev = require('express-validation');
const validations = require('../validations/topics');

const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.post('/topics', ev(validations.post), (req, res, next) => {
  const { name } = req.body;

  knex('topics')
    .select(knex.raw('1=1'))
    .where('name', name)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(409, 'Topic already exists');
      }

      const newTopic = { name };

      return knex('topics').insert(newTopic, '*');
    })
    .then((newTopics) => {
      delete newTopics[0].id;

      res.send(newTopics[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/topics', (req, res, next) => {
  knex('topics')
    .orderBy('name')
    .then((rows) => {
      const topics = camelizeKeys(rows);

      res.send(rows)
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
