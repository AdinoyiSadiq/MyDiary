import { expect } from 'chai';
import request from 'supertest';
import app from '..';
import resetDB from '../helpers/resetDB';

let token;

describe('Profile controller', () => {
  before((done) => {
  resetDB.resetDB();
  request(app)
    .post('/api/v1/auth/signup')
    .send({
      "email": "noyibywater@gmail.com",
      "password": "myPassword",
      "firstName": "Adinoyi",
      "lastName": "Sadiq"
    })
    .end((err, res) => {
      token = res.body.token
      done();
    });
  });

  describe('GET profile details', () => {
    it('GET to /api/v1/profile should return profile details of the user', done => {
      request(app)
        .get('/api/v1/profile')
        .set('Accept', 'application/json')
        .set({ 'authorization': token, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Retrieved User Profile Successfully')
          done();
        });
    });

    it('GET to /api/v1/profile should return an error when the wrong url is used', done => {
      request(app)
        .get('/api/v1/profiles')
        .set('Accept', 'application/json')
        .set({ 'authorization': token, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Invalid request, Route does not exist')
          done();
        });
    });

    it('GET to /api/v1/profile should return an error message if a token is not provided', done => {
      request(app)
        .get('/api/v1/profile')
        .set('Accept', 'application/json')
        .set({ Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthorized request, please login');
          done();
        });
    });
  });
});