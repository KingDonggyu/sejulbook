import { createPool, PoolConnection } from 'mysql2/promise';
import config from './config';

const connect = async (callback: (conn: PoolConnection) => void) => {
  const conn = await createPool(config).getConnection();
  await callback(conn);
  conn.release();
};

export default connect;
