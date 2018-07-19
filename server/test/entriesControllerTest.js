import { expect } from 'chai';
import request from 'supertest';

import app from '..';
import { resetTestDB } from '../controllers/entriesController';

describe('Entries controller', () => {
		let testDB;
	let len;

	beforeEach(() => {
		testDB = resetTestDB();
		len = testDB.length
	})

	describe('Getting all the entries', () => {
		it('GET to /api/v1/entries should return all the diary entries', done => {
			request(app)
				.get('/api/v1/entries')
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.entries.length).to.equal(len);
					expect(res.body.entries[0].title).to.equal('The Andela Way')
					done();
				});
		});
	});
});