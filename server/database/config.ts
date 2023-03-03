import { ConnectionOptions } from 'mysql2/promise';

const config: ConnectionOptions = {
  host: process.env.SEJULBOOK_DB_HOST,
  user: process.env.SEJULBOOK_DB_USER,
  database: process.env.SEJULBOOK_DB_DATABASE,
  password: process.env.SEJULBOOK_DB_PASSWORD,
  ssl: { rejectUnauthorized: true },
  connectionLimit: 50,
};

export default config;
