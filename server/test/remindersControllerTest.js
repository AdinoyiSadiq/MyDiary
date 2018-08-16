import { expect } from 'chai';
import request from 'supertest';
import app from '..';
import resetDB from '../helpers/resetDB';

let token;

describe('Reminders controller', () => {
  before((done) => {
  resetDB.resetDB();
  request(app)
    .post('/api/v1/auth/signup')
    .send({
      "email": "noyibyfire@yahoo.com",
      "password": "myPassword",
      "firstName": "Adinoyi",
      "lastName": "Sadiq"
    })
    .end((err, res) => {
      token = res.body.token
      done();
    });
  });

  describe('Creating a reminder', () => {
    it('POST to /api/v1/entries should create a new diary entry', done => {
      request(app)
        .post('/api/v1/reminders')
        .set({ 'authorization': token, 'Accept': 'application/json' })
        .send({
          date: Date.now() + 10000,
          content: 'Remember to write about your first kiss'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Diary Reminder Created Successfully');
          done();
        });
    });

    it('should return an error when passed insufficient entry data', done => {
      request(app)
        .post('/api/v1/reminders')
        .set({ 'authorization': token, 'Accept': 'application/json' })
        .send({
          date: Date.now() + 10000,
          content: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the content field');
          done();
        });
    });

    it('should return an error when passed insufficient entry data', done => {
      request(app)
        .post('/api/v1/reminders')
        .set({ 'authorization': token, 'Accept': 'application/json' })
        .send({
          date: '',
          content: 'Remember to write about your first kiss'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please fill the date field');
          done();
        });
    });

    it('should return an error when passed invalid entry data', done => {
      request(app)
        .post('/api/v1/reminders')
        .set({ 'authorization': token, 'Accept': 'application/json' })
        .send({
          date: Date.now() + 10000,
          content: 'Remember to write about your first kiss',
          invalid: 'Invalid data'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Too many fields');
          done();
        });
    });

    it('POST to /api/v1/reminders should return an error when the wrong url is used', done => {
      request(app)
        .post('/api/v1/reminder')
        .set({ 'authorization': token, 'Accept': 'application/json' })
        .send({
          date: Date.now() + 10000,
          content: 'Remember to write about your first kiss'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Invalid request, Route does not exist');
          done();
        });
    });

    it('POST to /api/v1/reminder should return an error message if a token is not provided', done => {
      request(app)
        .post('/api/v1/reminders')
        .set({ 'Accept': 'application/json' })
        .send({
          date: Date.now() + 10000,
          content: 'Remember to write about your first kiss'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthorized request, please login');
          done();
        });
    });
  });

  describe('GET reminders', () => {
    it('GET to /api/v1/reminders should return reminders', done => {
      request(app)
        .get('/api/v1/reminders')
        .set('Accept', 'application/json')
        .set({ 'authorization': token, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All Pending Reminders Retrieved Successfully');
          done();
        });
    });

    it('GET to /api/v1/reminders should return an error when the wrong url is used', done => {
      request(app)
        .get('/api/v1/reminder')
        .set('Accept', 'application/json')
        .set({ 'authorization': token, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Invalid request, Route does not exist');
          done();
        });
    });

    it('GET to /api/v1/reminders should return an error message if a token is not provided', done => {
      request(app)
        .get('/api/v1/reminders')
        .set('Accept', 'application/json')
        .set({ Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthorized request, please login');
          done();
        });
    });
  });

  describe('GET reminder time', () => {
    it('GET to /api/v1/reminder/time should return reminder time', done => {
      request(app)
        .get('/api/v1/reminder/time')
        .set('Accept', 'application/json')
        .set({ 'authorization': token, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Reminder Time Retrieved Successfully');
          done();
        });
    });

    it('GET to /api/v1/reminder/time should return an error when the wrong url is used', done => {
      request(app)
        .get('/api/v1/reminder/times')
        .set('Accept', 'application/json')
        .set({ 'authorization': token, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Invalid request, Route does not exist');
          done();
        });
    });

    it('GET to /api/v1/reminder/time should return an error message if a token is not provided', done => {
      request(app)
        .get('/api/v1/reminder/time')
        .set('Accept', 'application/json')
        .set({ Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthorized request, please login');
          done();
        });
    });
  });

  describe('UPDATE a reminder', () => {
  	let id;
  	beforeEach((done) => {
  		request(app)
        .post('/api/v1/reminders')
        .set({ 'authorization': token, 'Accept': 'application/json' })
        .send({
          date: Date.now() + 10000,
          content: 'Remember to write about your Andela experience'
        })
        .end((err, res) => {
          id = res.body.reminder.id;
          done();
        });
  	});

  	it('PUT to /api/v1/reminder/:id should update a single reminder', done => {
      request(app)
        .put(`/api/v1/reminder/${id}`)
        .set({ 'authorization': token, 'Accept': 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Updated Diary Reminder Successfully');
          done();
        });
  	});

  	it('PUT to /api/v1/reminder/:id should return an error when the wrong url is used', done => {
      request(app)
        .put(`/api/v1/reminders/${id}`)
        .set({ 'authorization': token, 'Accept': 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Invalid request, Route does not exist');
          done();
        });
  	});

  	it('PUT to /api/v1/reminder/:id should return an error message if a token is not provided', done => {
      request(app)
        .put(`/api/v1/reminder/${id}`)
        .set({ 'Accept': 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthorized request, please login');
          done();
        });
  	});
  });
});