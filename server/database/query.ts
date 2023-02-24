import connect from './connect';

const query = async <T>(sql: string) => {
  let result;

  await connect(async (conn) => {
    [result] = await conn.query(sql);
  });

  return result as unknown as T[];
};

export default query;
