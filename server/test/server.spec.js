const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');

describe('basic server', () => {
  it('sends back hello world', (done) => {
    request(app)
      .get('/api')
      .expect(200)
      .expect((res) => {
        expect(res.text).to.equal('Hello World!');
      })
      .end(done);
  });

  it('accepts POST request', (done) => {
    request(app)
      .post('/api')
      .expect(201)
      .expect((res) => {
        expect(res.body.data).to.equal('Posted!');
      })
      .end(done);
  });
});
