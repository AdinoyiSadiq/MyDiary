import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

if (process.env.NODE_ENV !== 'test') {
  pool = new pg.Pool({ connectionString: process.env.DEVELOPMENT });
} else {
  pool = new pg.Pool({ connectionString: process.env.TEST });
}

const db = pool;

db.query(
  'CREATE TABLE IF NOT EXISTS public.users (id SERIAL PRIMARY KEY, firstname character varying(100) NOT NULL, lastname character varying(100) NOT NULL, email character varying(100) NOT NULL, password character varying(100) NOT NULL)',
  () => {},
);

export default db;
