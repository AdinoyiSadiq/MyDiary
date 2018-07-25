import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DEVELOPMENT });

export default db;
