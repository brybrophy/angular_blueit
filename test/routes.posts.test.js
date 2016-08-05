'use strict';

process.env.NODE_ENV = 'test';

const { assert, expect, should } = require('chai');
const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../server');
const knex = require('../knex');

const posts = require('../routes/posts');

suite('Routes Posts', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('GET /api/posts', (done) => {
    request(server)
      .get('/api/posts')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        title: "Dogs Not Allowed On Subway",
        image_url: "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
        description: "What an awesome story.",
        rating: 0,
        user_id: 1,
        topic_id: 1,
        created_at: new Date('2016-07-23 14:26:16 UTC').toISOString(),
        updated_at: new Date('2016-07-23 14:26:16 UTC').toISOString()
      },
      {
        id: 2,
        title: "Wagging That Tail",
        image_url: "https://a.thumbs.redditmedia.com/pl1fM2jukfU2xW6hamMUF5dJ5gC_igj-1Z2oMwQM_90.jpg",
        description: "What an awesome story.",
        rating: 0,
        user_id: 1,
        topic_id: 1,
        created_at: new Date('2016-07-23 14:26:16 UTC').toISOString(),
        updated_at: new Date('2016-07-23 14:26:16 UTC').toISOString()
      }], done);
  });

  test('GET /api/posts/:topicId', (done) => {
    request(server)
      .get('/api/posts/1')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        title: "Dogs Not Allowed On Subway",
        image_url: "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
        description: "What an awesome story.",
        rating: 0,
        user_id: 1,
        topic_id: 1,
        created_at: new Date('2016-07-23 14:26:16 UTC').toISOString(),
        updated_at: new Date('2016-07-23 14:26:16 UTC').toISOString()
      },
      {
        id: 2,
        title: "Wagging That Tail",
        image_url: "https://a.thumbs.redditmedia.com/pl1fM2jukfU2xW6hamMUF5dJ5gC_igj-1Z2oMwQM_90.jpg",
        description: "What an awesome story.",
        rating: 0,
        user_id: 1,
        topic_id: 1,
        created_at: new Date('2016-07-23 14:26:16 UTC').toISOString(),
        updated_at: new Date('2016-07-23 14:26:16 UTC').toISOString()
      }], done);
  });

  test('POST /api/posts', (done) => {
    request(server)
      .post('/api/posts')
      .send({
        title: "If You Give A Cat A Cupcake",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/610KhnVUlUL._SX258_BO1,204,203,200_.jpg,",
        description: "If you give a cat a cupcake, he'll ask for some sprinkles to go with it. When you give him the sprinkles, he might spill some on the floor. Cleaning up will make him hot, so you'll give him a bathing suit... and that's just the beginning!",
        rating: 0,
        userId: 1,
        topicId: 2
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.created_at;
        delete res.body.updated_at;
      })
      .expect(200, {
        id: 3,
        title: "If You Give A Cat A Cupcake",
        image_url: "https://images-na.ssl-images-amazon.com/images/I/610KhnVUlUL._SX258_BO1,204,203,200_.jpg,",
        description: "If you give a cat a cupcake, he'll ask for some sprinkles to go with it. When you give him the sprinkles, he might spill some on the floor. Cleaning up will make him hot, so you'll give him a bathing suit... and that's just the beginning!",
        rating: 0,
        user_id: 1,
        topic_id: 2
      }, done);
  });

  test('PATCH /api/posts/:postId', (done) => {
    request(server)
      .patch('/api/posts/1')
      .send({
        title: "Dogs Not Allowed On Subway",
        image_url: "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
        description: "What an awesome story.",
        rating: 10,
        user_id: 1,
        topic_id: 1
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.created_at;
        delete res.body.updated_at;
      })
      .expect(200, {
        id: 1,
        title: "Dogs Not Allowed On Subway",
        image_url: "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
        description: "What an awesome story.",
        rating: 10,
        user_id: 1,
        topic_id: 1
      }, done);
  });
});
