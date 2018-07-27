// import { expect } from 'chai';
// import request from 'supertest';
// import db from '../db';
// import app from '..';

// before((done) => {
//   db.query('DROP TABLE public.entries',
//     () => {},
//   )

//   db.query('DROP TABLE public.users',
//     () => {},
//   )

//   db.query('CREATE TABLE IF NOT EXISTS public.users (id SERIAL PRIMARY KEY, firstname character varying(100) NOT NULL, lastname character varying(100) NOT NULL, email character varying(100) NOT NULL, password character varying(100) NOT NULL)',
//     () => {},
//   )
//   done();
// });

// after((done) => {
//   db.query('DROP TABLE public.entries',
//     () => {},
//   )
//   db.query('DROP TABLE IF EXISTS public.users',
//     () => {},
//   )
//   done();
// });

// describe('Authentication controller', () => {
//   describe('Signup a new user', () => {
//   	it('POST to /api/v1/auth/signup should create a user successfully', done => {
//   		request(app)
//   		  .post('/api/v1/auth/signup')
//   		  .send({
//           "email": "adinoyi@gmail.com",
//           "password": "myPassword",
//           "firstName": "Adinoyi",
//           "lastName": "Sadiq"
//         })
//   		  .end((err, res) => {
//   		  	expect(res.status).to.equal(200);
//           expect(res.body.token).to.be.a('string');
//   		  	done();
//   		  });
//   	});

//     it('Should return an error message when the user tries to sign up with no data', done => {
//       request(app)
//         .post('/api/v1/auth/signup')
//         .send({
//           "email": "",
//           "password": "",
//           "firstName": "",
//           "lastName": ""
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the firstName, lastName, email, and password fields');
//           done();
//         });
//     });

//     it('Should return an error message when the user tries to sign up without filling email field', done => {
//       request(app)
//         .post('/api/v1/auth/signup')
//         .send({
//           "email": "",
//           "password": "password",
//           "firstName": "Adinoyi",
//           "lastName": "Sadiq"
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the email field');
//           done();
//         });
//     });

//     it('Should return an error message when the user tries to sign up without filling password field', done => {
//       request(app)
//         .post('/api/v1/auth/signup')
//         .send({
//           "email": "myemail@gmail.com",
//           "password": "",
//           "firstName": "Adinoyi",
//           "lastName": "Sadiq"
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the password field');
//           done();
//         });
//     });

//     it('Should return an error message when the user tries to sign up without filling first name field', done => {
//       request(app)
//         .post('/api/v1/auth/signup')
//         .send({
//           "email": "myemail@gmail.com",
//           "password": "password",
//           "firstName": "",
//           "lastName": "Sadiq"
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the firstName field');
//           done();
//         });
//     });

//     it('Should return an error message when the user tries to sign up without filling last name field', done => {
//       request(app)
//         .post('/api/v1/auth/signup')
//         .send({
//           "email": "myemail@gmail.com",
//           "password": "password",
//           "firstName": "Adinoyi",
//           "lastName": ""
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the lastName field');
//           done();
//         });
//     });

//     it('Should return an error message when the user tries to sign up after passing more than the required fields', done => {
//       request(app)
//         .post('/api/v1/auth/signup')
//         .send({
//           "email": "myemail@gmail.com",
//           "password": "password",
//           "firstName": "Adinoyi",
//           "lastName": "Sadiq",
//           "occupation": "Software developer"
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Too many fields');
//           done();
//         });
//     });
//   });

//   describe('Signin a new user', () => {
//     it('POST to /api/v1/auth/signin should create a authenticate a user using username and password', done => {
//       request(app)
//         .post('/api/v1/auth/signin')
//         .send({
//           "email": "adinoyi@gmail.com",
//           "password": "myPassword"
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body.token).to.be.a('string');
//           done();
//         });
//     });

//     it('Should return an error message when the user tries to sign in with no data', done => {
//       request(app)
//         .post('/api/v1/auth/signin')
//         .send({
//           "email": "",
//           "password": ""
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the email and password fields');
//           done();
//         });
//     });

//     it('Should return an error message when the user tries to sign in without filling the email field', done => {
//       request(app)
//         .post('/api/v1/auth/signin')
//         .send({
//           "email": "",
//           "password": "myPassword"
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the email field');
//           done();
//         });
//     });

//     it('Should return an error message when the user tries to sign in without filling the password field', done => {
//       request(app)
//         .post('/api/v1/auth/signin')
//         .send({
//           "email": "myemail@gmail.com",
//           "password": ""
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the password field');
//           done();
//         });
//     });

//     it('Should return an error message when the user tries to sign in after passing more than the required fields', done => {
//       request(app)
//         .post('/api/v1/auth/signup')
//         .send({
//           "email": "myemail@gmail.com",
//           "password": "password",
//           "firstName": "Adinoyi",
//           "lastName": "Sadiq",
//           "occupation": "Software developer"
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Too many fields');
//           done();
//         });
//     });
//   });
// });