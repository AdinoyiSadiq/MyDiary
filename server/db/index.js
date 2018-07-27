import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DEVELOPMENT });

db.query(
  `
CREATE TABLE public.users (
id SERIAL PRIMARY KEY,
firstname character varying(100) NOT NULL,
lastname character varying(100) NOT NULL,
email character varying(100) NOT NULL,
password character varying(100) NOT NULL
)
  `,
  () => { },
);

db.query(
  `
CREATE TABLE public.entries (
id SERIAL PRIMARY KEY,
user_id integer REFERENCES public.users,
title character varying(100) NOT NULL,
content character varying(255) NOT NULL,
created bigint NOT NULL,
updated bigint NOT NULL
);
  `,
  () => { },
);

export default db;