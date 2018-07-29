import { expect } from 'chai';
import request from 'supertest';
import app from '..';
import resetDB from '../helpers/resetDB';

let token;

describe('Entries controller', () => {
  before((done) => {
  resetDB.resetDB();
  request(app)
    .post('/api/v1/auth/signup')
    .send({
      "email": "noyisama@gmail.com",
      "password": "myPassword",
      "firstName": "Adinoyi",
      "lastName": "Sadiq"
    })
    .end((err, res) => {
      console.log(res.status)
      token = res.body.token
      done();
    });
  });

  // after((done) => {
  //   resetDB.resetDB();

  //   done();
  // });

  describe('Creating an entry', () => {
    it('POST to /api/v1/entries should create a new diary entry', done => {
      console.log('token:',token);
      request(app)
        .post('/api/v1/entries')
        .set({ 'authorization': token, 'Accept': 'application/json' })
        .send({
          title: 'A Year of Code',
          content: 'A few weeks ago, I marked a year since I started coding every day'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Diary Entry Created Successfully');
          expect(res.body.entry.title).to.equal('A Year of Code');
          done();
        });
    });

//     it('should return an error when passed insufficient entry data', done => {
//       request(app)
//         .post('/api/v1/entries')
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .send({
//           title: 'A Year of Code',
//           content: ''
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the content field');
//           done();
//         });
//     });

//     it('should return an error when passed insufficient entry data', done => {
//       request(app)
//         .post('/api/v1/entries')
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .send({
//           title: '',
//           content: 'A few weeks ago, I marked a year since I started coding every day'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the title field');
//           done();
//         });
//     });

//     it('should return an error when passed invalid entry data', done => {
//       request(app)
//         .post('/api/v1/entries')
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .send({
//           title: 'A Year of Code',
//           content: 'A few weeks ago, I marked a year since I started coding every day',
//           invalid: 'Invalid data'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Too many fields')
//           done();
//         });
//     });

//     it('POST to /api/v1/entries should return an error when the wrong url is used', done => {
//       request(app)
//         .post('/api/v1/entrie')
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .send({
//           title: 'A Year of Code',
//           content: 'A few weeks ago, I marked a year since I started coding every day'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.message).to.equal('Invalid request, Route does not exist')
//           done();
//         });
//     });

//     it('POST to /api/v1/entries should return an error message if a token is not provided', done => {
//       request(app)
//         .post('/api/v1/entries')
//         .send({
//           title: 'A Year of Code',
//           content: 'A few weeks ago, I marked a year since I started coding every day'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.body.message).to.equal('Unauthorized request, please login');
//           done();
//         });
//     });
//   });

//   describe('GET all the entries', () => {
//     it('GET to /api/v1/entries should return all the diary entries', done => {
//       request(app)
//         .get('/api/v1/entries')
//         .set('Accept', 'application/json')
//         .set({ 'authorization': token, Accept: 'application/json' })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body.message).to.equal('All Diary Entries Retrieved Successfully')
//           done();
//         });
//     });

//     it('GET to /api/v1/entries should return an error when the wrong url is used', done => {
//       request(app)
//         .get('/api/v1/entrie')
//         .set('Accept', 'application/json')
//         .set({ 'authorization': token, Accept: 'application/json' })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.message).to.equal('Invalid request, Route does not exist')
//           done();
//         });
//     });

//     it('GET to /api/v1/entries should return an error message if a token is not provided', done => {
//       request(app)
//         .get('/api/v1/entries')
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.body.message).to.equal('Unauthorized request, please login')
//           done();
//         });
//     });
//   });

//   describe('GET a single entry', () => {
//   	let id;
//   	beforeEach((done) => {
//   		request(app)
//         .post('/api/v1/entries')
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .send({
//           title: 'A Year of Code',
//           content: 'A few weeks ago, I marked a year since I started coding every day'
//         })
//         .end((err, res) => {
//           id = res.body.entry.id;
//           done();
//         });
//   	});

//   	it('GET to /api/v1/entries/:id should return a single diary entry', done => {
//       request(app)
//         .get(`/api/v1/entries/${id}`)
//         .set('Accept', 'application/json')
//         .set({ 'authorization': token, Accept: 'application/json' })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body.entry.title).to.equal('A Year of Code')
//           done();
//         });
//     });

//     it('GET to /api/v1/entries/:id should return a single diary entry', done => {
//       request(app)
//         .get(`/api/v1/entries/1000000`)
//         .set('Accept', 'application/json')
//         .set({ 'authorization': token, Accept: 'application/json' })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.message).to.equal('Entry not found');
//           done();
//         });
//     });

//     it('GET to /api/v1/entries/:id should return an error when the wrong url is used', done => {
//       request(app)
//         .get(`/api/v1/entrie/${id}`)
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.message).to.equal('Invalid request, Route does not exist')
//           done();
//         });
//     });

//     it('GET to /api/v1/entries should return an error message if a token is not provided', done => {
//       request(app)
//         .get(`/api/v1/entries/${id}`)
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.body.message).to.equal('Unauthorized request, please login')
//           done();
//         });
//     });
//   });

//   describe('DELETE an entry', () => {
//   	let id;
//   	beforeEach((done) => {
//   		request(app)
//         .post('/api/v1/entries')
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .send({
//           title: 'A Year of Code',
//           content: 'A few weeks ago, I marked a year since I started coding every day'
//         })
//         .end((err, res) => {
//           id = res.body.entry.id;
//           done();
//         });
//   	});

//     it('DELETE to /api/v1/entries/1 should delete a diary entry', done => {
//       request(app)
//         .delete(`/api/v1/entries/${id}`)
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body.message).to.equal('Deleted Diary Entry Successfully')
//           done();
//         });
//     });

//     it('should return an error when an entry is not found', done => {
// 	  request(app)
//         .delete('/api/v1/entries/1000000')
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.message).to.equal('Entry not found')
//           done();
//         });
//     });

//     it('DELETE to /api/v1/entries/:id should return an error when the wrong url is used', done => {
//       request(app)
//         .delete(`/api/v1/entrie/${id}`)
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.message).to.equal('Invalid request, Route does not exist')
//           done();
//         });
//     });

//     it('DELETE to /api/v1/entries should return an error message if a token is not provided', done => {
//       request(app)
//         .delete(`/api/v1/entries/${id}`)
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.body.message).to.equal('Unauthorized request, please login')
//           done();
//         });
//     });
//   });

//   describe('UPDATE an entry', () => {
//     let id;
//   	beforeEach((done) => {
//   		request(app)
//         .post('/api/v1/entries')
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .send({
//           title: 'A Year of Code',
//           content: 'A few weeks ago, I marked a year since I started coding every day'
//         })
//         .end((err, res) => {
//           id = res.body.entry.id;
//           done();
//         });
//   	});

//   	it('PUT to /api/v1/entries/1 should update a diary entry', done => {
//       request(app)
//         .put(`/api/v1/entries/${id}`)
//         .set('Accept', 'application/json')
//         .set({ 'authorization': token, Accept: 'application/json' })
//         .send({
// 	      title: 'Two Years of Code',
// 	      content: 'So it has been two years now since I became a software developer'
//         })
//         .end((err, res) => {
// 	        expect(res.status).to.equal(200);
// 	        expect(res.body.message).to.equal('Edited Diary Entry Successfully');
// 	        expect(res.body.entry.title).to.equal('Two Years of Code');
//           expect(res.body.entry.content).to.equal('So it has been two years now since I became a software developer');
// 	        done();
//         });
//     });

//     it('should return an error when passed insufficient entry data', done => {
//       request(app)
//         .put(`/api/v1/entries/${id}`)
//         .set('Accept', 'application/json')
//         .set({ 'authorization': token, Accept: 'application/json' })
//         .send({
//           title: 'A Year of Code',
//           content: ''
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the content field');
// 		  done();
//         });
//     });

//     it('should return an error when passed insufficient entry data', done => {
//       request(app)
//         .put(`/api/v1/entries/${id}`)
//         .set('Accept', 'application/json')
//         .set({ 'authorization': token, Accept: 'application/json' })
//         .send({
//           title: '',
//           content: 'So it has been two years now since I became a software developer'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.message).to.equal('Please fill the title field');
//       done();
//         });
//     });

//     it('should return an error when passed invalid entry data', done => {
// 	  request(app)
//       .put(`/api/v1/entries/${id}`)
//       .set('Accept', 'application/json')
//       .set({ 'authorization': token, Accept: 'application/json' })
//       .send({
//         title: 'A Year of Code',
//         content: 'A few weeks ago, I marked a year since I started coding every day',
//         invlaid: 'Invalid data'
//       })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body.message).to.equal('Too many fields');
//         done();
//       });
//     });
 
//     it('PUT to /api/v1/entries/:id should return an error when the wrong url is used', done => {
//       request(app)
//         .put(`/api/v1/entrie/${id}`)
//         .set({ 'authorization': token, 'Accept': 'application/json' })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.message).to.equal('Invalid request, Route does not exist')
//           done();
//         });
//     });

//     it('PUT to /api/v1/entries should return an error message if a token is not provided', done => {
//       request(app)
//         .put(`/api/v1/entries/${id}`)
//         .send({
//         title: 'Two Years of Code',
//         content: 'So it has been two years now since I became a software developer'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.body.message).to.equal('Unauthorized request, please login');
//           done();
//         });
//     });
  });  
});
