import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DEVELOPMENT });

db.query(
  'CREATE TABLE IF NOT EXISTS public.users (id SERIAL PRIMARY KEY, firstName character varying(100) NOT NULL, lastName character varying(100) NOT NULL, email character varying(100) NOT NULL, password character varying(100) NOT NULL)',
  () => {},
);

export default db;
