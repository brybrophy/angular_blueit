'use strict';

const fs = require('fs');

const assert = require('chai').assert;
const { suite, test } = require('mocha');

const users = require('../routes/users');

suite('users', function() {
  it('should list ALL blobs on /blobs GET');
  it('should list a SINGLE blob on /blob/<id> GET');
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
});
