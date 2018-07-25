import { expect } from 'chai';
import request from 'supertest';
import db from '../db';
import app from '..';

describe('Authentication controller', () => {
  beforeEach(() => {
    db.query('CREATE TABLE IF NOT EXISTS public.users (id SERIAL PRIMARY KEY, firstname character varying(100) NOT NULL, lastname character varying(100) NOT NULL, email character varying(100) NOT NULL, password character varying(100) NOT NULL)',
      () => {},
    )
  });

  afterEach(() => {
    db.query('DROP TABLE public.users',
      () => {},
    )
  });

  describe('Signup a new user', () => {
  	it('POST to /api/v1/auth/signup should return a JSON web token', done => {
  		request(app)
  		  .post('/api/v1/auth/signup')
  		  .send({
  		  	firstName: 'Adinoyi',
            lastName: 'Sadiq',
            email: 'myemail@gmail.com',
            password: 'mypassword'
		  })
  		  .end((err, res) => {
  		  	console.log(res.status);
  		  	done();
  		  });
  	});
  });
});