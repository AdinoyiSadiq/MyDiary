import { expect } from 'chai';
import request from 'supertest';
import app from '..';
import resetDB from '../helpers/resetDB';

after((done) => {
  resetDB.resetDB();

  done();
});

describe('Authentication controller', () => {
  beforeEach((done) => {
    resetDB.resetDB();

    done();
  })
  describe('Signup a new user', () => {
    it('POST to /api/v1/auth/signup should create a user successfully', done => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          "email": "adinoyi@gmail.com",
          "password": "myPassword",
          "firstName": "Adinoyi",
          "lastName": "Sadiq"
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('Should return an error message when the user tries to sign up with no data', done => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          "email": "",
          "password": "",
          "firstName": "",
          "lastName": ""
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the firstName, lastName, email, and password fields');
          done();
        });
    });

    it('Should return an error message when the user tries to sign up without filling email field', done => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          "password": "password",
          "firstName": "Adinoyi",
          "lastName": "Sadiq"
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the email field');
          done();
        });
    });

    it('Should return an error message when the user tries to sign up without filling password field', done => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          "email": "myemail@gmail.com",
          "firstName": "Adinoyi",
          "lastName": "Sadiq"
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the password field');
          done();
        });
    });

    it('Should return an error message when the user tries to sign up without filling first name field', done => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          "email": "myemail@gmail.com",
          "password": "password",
          "firstName": "",
          "lastName": "Sadiq"
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the firstName field');
          done();
        });
    });

    it('Should return an error message when the user tries to sign up without filling last name field', done => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          "email": "myemail@gmail.com",
          "password": "password",
          "firstName": "Adinoyi",
          "lastName": ""
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the lastName field');
          done();
        });
    });

    it('Should return an error message when the user tries to sign up after passing more than the required fields', done => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          "email": "myemail@gmail.com",
          "password": "password",
          "firstName": "Adinoyi",
          "lastName": "Sadiq",
          "occupation": "Software developer"
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Too many fields');
          done();
        });
    });
  });

  describe('Signin a new user', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          "email": "sadiqadinoyi@gmail.com",
          "password": "myPassword",
          "firstName": "Adinoyi",
          "lastName": "Sadiq"
        })
        .end((err, res) => {
          done();
        });
    });

    it('POST to /api/v1/auth/signin should create a authenticate a user using username and password', done => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          "email": "sadiqadinoyi@gmail.com",
          "password": "myPassword"
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('Should return an error message when the user tries to sign in with no data', done => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          "email": "",
          "password": ""
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the email and password fields');
          done();
        });
    });

    it('Should return an error message when the user tries to sign in without filling the email field', done => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          "email": "",
          "password": "myPassword"
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the email field');
          done();
        });
    });

    it('Should return an error message when the user tries to sign in without filling the password field', done => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          "email": "myemail@gmail.com",
          "password": ""
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the password field');
          done();
        });
    });

    it('Should return an error message when the user tries to sign in after passing more than the required fields', done => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          "email": "myemail@gmail.com",
          "password": "password",
          "firstName": "Adinoyi",
          "lastName": "Sadiq",
          "occupation": "Software developer"
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Too many fields');
          done();
        });
    });
  });
});