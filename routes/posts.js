'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

const ev = require('express-validation');
const validations = require('../validations/posts');

const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.post('/posts', ev(validations.post), (req, res, next) => {
  const { title, imageUrl, description, userId, topicId } = req.body;

  knex('posts')
    .select(knex.raw('1=1'))
    .where('title', title)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(409, 'A post with this title already exists.');
      }

      const newPost = { title, imageUrl, description, userId, topicId };
      const row = decamelizeKeys(newPost);

      return knex('posts').insert(row, '*');
    })
    .then((newPosts) => {
      res.send(newPosts[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/posts', (req, res, next) => {
  knex('posts')
    .orderBy('title')
    .then((posts) => {
      if (posts.length <= 0) {
        throw boom.create(404, 'There are no posts yet. Be the first one to write a post on Blueit!')
      }

      res.send(posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/posts/:topicId', (req, res, next) => {
  const topicId = req.params.topicId;

  knex('posts')
    .where('topic_id', topicId)
    .orderBy('title')
    .then((posts) => {
      if (posts.length <= 0) {
        throw boom.create(404, 'This topic does not contain any posts.')
      }

      res.send(posts);
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
