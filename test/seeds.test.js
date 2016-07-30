'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');

suite('Seeds', () => {
  before(function(done) {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach(function(done) {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Topics Seed', (done) => {
    knex('topics').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [{
          id: 1,
          name: 'Dogs',
          created_at: new Date('2016-07-23 14:26:16 UTC'),
          updated_at: new Date('2016-07-23 14:26:16 UTC')
        }, {
          id: 2,
          name: 'Cats',
          created_at: new Date('2016-07-23 14:26:16 UTC'),
          updated_at: new Date('2016-07-23 14:26:16 UTC')
        }];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i]
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Posts Seed', (done) => {
    knex('posts').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [{
          id: 1,
          title: "Dogs Are Not Allowed On NYC Subway Unless They're In A Carrier… So This Happened",
          image_url: "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
          description: "What an awesome story.",
          rating: 0,
          user_id: 1,
          topic_id: 1,
          created_at: new Date('2016-07-23 14:26:16 UTC'),
          updated_at: new Date('2016-07-23 14:26:16 UTC')
        }, {
          id: 2,
          title: "Wagging That Tail",
          image_url: "https://a.thumbs.redditmedia.com/pl1fM2jukfU2xW6hamMUF5dJ5gC_igj-1Z2oMwQM_90.jpg",
          description: "What an awesome story.",
          rating: 0,
          user_id: 1,
          topic_id: 1,
          created_at: new Date('2016-07-23 14:26:16 UTC'),
          updated_at: new Date('2016-07-23 14:26:16 UTC')
        }];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i]
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Users Seed', (done) => {
    knex('users').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [{
          id: 1,
          username: 'admin',
          hashed_password: '$2a$12$Q3fh1jeJZ2Q19Yr12aVOxO54a/IvBhS01qWCqxNAZc0ABRxq0NnYq',
          first_name: 'Johnny',
          last_name: 'Quest',
          created_at: new Date('2016-07-23 14:26:16 UTC'),
          updated_at: new Date('2016-07-23 14:26:16 UTC')
        }];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i]
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
