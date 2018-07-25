import pg from 'pg';
import dev from '../config/dev';

const db = new pg.Pool({ connectionString: dev.connectionString });

export default db;
