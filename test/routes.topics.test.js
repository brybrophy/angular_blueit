'use strict';

process.env.NODE_ENV = 'test';

const { assert, expect, should } = require('chai');
const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../server');
const knex = require('../knex');

const posts = require('../routes/posts');

suite('Routes Topics', () => {
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

  test('GET /api/topics', (done) => {
    request(server)
      .get('/api/topics')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 2,
        name: 'Cats',
        created_at: new Date('2016-07-23 14:26:16 UTC').toISOString(),
        updated_at: new Date('2016-07-23 14:26:16 UTC').toISOString()
      },
      {
        id: 1,
        name: 'Dogs',
        created_at: new Date('2016-07-23 14:26:16 UTC').toISOString(),
        updated_at: new Date('2016-07-23 14:26:16 UTC').toISOString()
      }], done);
  });

  test('POST /api/topics', (done) => {
    request(server)
      .post('/api/topics')
      .send({
        name: 'Songs by Gene Belcher',
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.created_at;
        delete res.body.updated_at;
      })
      .expect(200, {
        id: 3,
        name: 'Songs by Gene Belcher'
      }, done);
  });
});
