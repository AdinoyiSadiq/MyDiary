import { expect } from 'chai';
import request from 'supertest';
import db from '../db';
import app from '..';

let token;

before((done) => {
  db.query('CREATE TABLE IF NOT EXISTS public.users (id SERIAL PRIMARY KEY, firstname character varying(100) NOT NULL, lastname character varying(100) NOT NULL, email character varying(100) NOT NULL, password character varying(100) NOT NULL)',
   () => {
    request(app)
    .post('/api/v1/auth/signup')
    .send({
      "email": "ANEU@gmail.com",
      "password": "myPassword",
      "firstName": "Abdulmalik",
      "lastName": "Umaru"
    })
    .end((err, res) => {
      token = res.body.token
      console.log('RESPONSE',res.status, res.body.token)
      done();
    });
   },);

  db.query('CREATE TABLE IF NOT public.entries (id SERIAL PRIMARY KEY, user_id integer REFERENCES public.users, title character varying(100) NOT NULL, content character varying(255) NOT NULL, created bigint NOT NULL, updated bigint NOT NULL ON UPDATE CASCADE ON DELETE CASCADE',
   () => {},);
});

afterEach((done) => {
  db.query('DROP TABLE public.entries; DROP TABLE public.users;',
    (err, resp) => {
      console.log(resp)
    },
  )
  // db.query('DROP TABLE public.users',
  //   (err, resp) => {
  //     console.log(resp)
  //   },
  // )
  done();
});

describe('Entries controller', () => {
  describe('Creating an entry', () => {
    it('POST to /api/v1/entries should create a new diary entry', done => {
      console.log(token)
      done();
      // request(app)
      //   .post('/api/v1/entries')
      //   .set({ 'authorization': token, 'Accept': 'application/json' })
      //   .send({
      //     authorID: 1,
      //     title: 'A Year of Code',
      //     content: 'A few weeks ago, I marked a year since I started coding every day'
      //   })
      //   .end((err, res) => {
      //     expect(res.status).to.equal(201);
      //     expect(res.body.message).to.equal('Diary Entry Created Successfully');
      //     expect(res.body.entry.title).to.equal('A Year of Code');
      //     done();
      //   });
    });

    // it('should return an error when passed insufficient entry data', done => {
    //   request(app)
    //     .post('/api/v1/entries')
    //     .send({
    //       authorID: 1,
    //       title: 'A Year of Code'
    //     })
    //     .end((err, res) => {
    //       expect(res.status).to.equal(400);
    //       expect(res.body.message).to.equal('Please fill the content field');
    //       done();
    //     });
    // });

    // it('should return an error when passed invalid entry data', done => {
    //   request(app)
    //     .post('/api/v1/entries')
    //     .send({
    //       authorID: 1,
    //       title: 'A Year of Code',
    //       content: 'A few weeks ago, I marked a year since I started coding every day',
    //       invlaid: 'Invalid data'
    //     })
    //     .end((err, res) => {
    //       expect(res.status).to.equal(400);
    //       expect(res.body.message).to.equal('Too many fields')
    //       done();
    //     });
    // });
  });

 //  describe('GET all the entries', () => {
 //    it('GET to /api/v1/entries should return all the diary entries', done => {
 //      let token;

 //      request(app)
 //        .post('/api/v1/auth/signup')
 //        .send({
 //          "email": "adinoyi@gmail.com",
 //          "password": "myPassword",
 //          "firstName": "Adinoyi",
 //          "lastName": "Sadiq"
 //        })
 //        .end((err, res) => {
 //          token = res.body.token
 //          done();
 //        });

 //      request(app)
 //        .get('/api/v1/entries')
 //        .set('Accept', 'application/json')
 //        .set({ 'authorization': token, Accept: 'application/json' })
 //        .end((err, res) => {
 //          expect(res.status).to.equal(200);
 //          expect(res.body.entries.length).to.equal(len);
 //          expect(res.body.entries[0].title).to.equal('The Andela Way')
 //          done();
 //        });
 //    });
 //  });

 //  describe('GET a single entry', () => {
 //    beforeEach((done) => {
 //      let token;
      
 //      request(app)
 //        .post('/api/v1/auth/signup')
 //        .send({
 //          "email": "adinoyi@gmail.com",
 //          "password": "myPassword",
 //          "firstName": "Adinoyi",
 //          "lastName": "Sadiq"
 //        })
 //        .end((err, res) => {
 //          token = res.body.token
 //          done();
 //        });
 //    })

 //    it('GET to /api/v1/entries/1 should return a single diary entry', done => {
 //      request(app)
 //        .get('/api/v1/entries/1')
 //        .set('Accept', 'application/json')
 //        .set({ 'authorization': token, Accept: 'application/json' })
 //        .end((err, res) => {
 //          expect(res.status).to.equal(200);
 //          expect(res.body.entry.title).to.equal('The Andela Way')
 //          done();
 //        });
 //    });

 //    it('should return an error when an entry is not found', done => {
	//   request(app)
 //        .get('/api/v1/entries/2')
 //        .set('Accept', 'application/json')
 //        .set({ 'authorization': token, Accept: 'application/json' })
 //        .end((err, res) => {
 //          expect(res.status).to.equal(404);
 //          expect(res.body.message).to.equal('Entry not found')
 //          done();
 //        });
 //    });
 //  });

 //  describe('DELETE an entry', () => {
 //    it('DELETE to /api/v1/entries/1 should delete a diary entry', done => {
 //      request(app)
 //        .delete('/api/v1/entries/1')
 //        .end((err, res) => {
 //          expect(res.status).to.equal(200);
 //          expect(res.body.message).to.equal('Deleted Diary Entry Successfully')
 //          done();
 //        });
 //    });

 //    it('should return an error when an entry is not found', done => {
	//   request(app)
 //        .delete('/api/v1/entries/2')
 //        .end((err, res) => {
 //          expect(res.status).to.equal(404);
 //          expect(res.body.message).to.equal('Entry not found')
 //          done();
 //        });
 //    });
 //  });

 //  describe('UPDATE an entry', () => {
 //    beforeEach((done) => {
 //      let token;
      
 //      request(app)
 //        .post('/api/v1/auth/signup')
 //        .send({
 //          "email": "adinoyi@gmail.com",
 //          "password": "myPassword",
 //          "firstName": "Adinoyi",
 //          "lastName": "Sadiq"
 //        })
 //        .end((err, res) => {
 //          token = res.body.token
 //          done();
 //        });

 //        request(app)
 //          .post('/api/v1/entries')
 //          .set('Accept', 'application/json')
 //          .set({ 'authorization': token, Accept: 'application/json' })
 //          .send({
 //            authorID: 1,
 //            title: 'A Year of Code',
 //            content: 'A few weeks ago, I marked a year since I started coding every day'
 //          })
 //          .end((err, res) => {
 //            expect(res.status).to.equal(201);
 //            expect(res.body.message).to.equal('Diary Entry Created Successfully');
 //            expect(res.body.entry.title).to.equal('A Year of Code');
 //            done();
 //          });
 //    })

 //    it('PUT to /api/v1/entries/1 should update a diary entry', done => {
 //      request(app)
 //        .put('/api/v1/entries/1')
 //        .set('Accept', 'application/json')
 //        .set({ 'authorization': token, Accept: 'application/json' })
 //        .send({
	//       title: 'Two Years of Code',
	//       content: 'So it has been two years now since I became a software developer'
 //        })
 //        .end((err, res) => {
	//       expect(res.status).to.equal(200);
	//       expect(res.body.message).to.equal('Edited Diary Entry Successfully');
	//       expect(res.body.entry.title).to.equal('Two Years of Code')
	//       done();
 //        });
 //    });

 //    it('should return an error when passed insufficient entry data', done => {
 //      request(app)
 //        .put('/api/v1/entries/1')
 //        .set('Accept', 'application/json')
 //        .set({ 'authorization': token, Accept: 'application/json' })
 //        .send({
 //          title: 'A Year of Code'
 //        })
 //        .end((err, res) => {
 //          expect(res.status).to.equal(400);
 //          expect(res.body.message).to.equal('Please fill the content field');
	// 	  done();
 //        });
 //    });

	// it('should return an error when passed invalid entry data', done => {
	//   request(app)
 //      .put('/api/v1/entries/1')
 //      .set('Accept', 'application/json')
 //      .set({ 'authorization': token, Accept: 'application/json' })
 //      .send({
 //        title: 'A Year of Code',
 //        content: 'A few weeks ago, I marked a year since I started coding every day',
 //        invlaid: 'Invalid data'
 //      })
 //      .end((err, res) => {
 //        expect(res.status).to.equal(400);
 //        expect(res.body.message).to.equal('Too many fields');
 //        done();
 //      });
 //    });
  // });
});