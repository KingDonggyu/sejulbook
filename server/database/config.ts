import { ConnectionOptions } from 'mysql2/promise';

const config: ConnectionOptions = {
  host: process.env.PLANETSCALE_DB_HOST,
  user: process.env.PLANETSCALE_DB_USERNAME,
  database: process.env.PLANETSCALE_DB,
  password: process.env.PLANETSCALE_DB_PASSWORD,
  ssl: { rejectUnauthorized: true },
  connectionLimit: 50,
};

export default config;
