import { createPool, Pool, PoolConnection } from "mysql";
import { promisify } from "util";
import config from "../config/config";

type queryValue = Array<string | number | boolean | null | undefined> | string;

const params = {
  connectionLimit: 10000,
  user: config.MySQL.username,
  password: config.MySQL.password,
  host: config.MySQL.host,
  database: config.MySQL.database,
};

const pool: Pool = createPool(params);

export const getConnection = async (): Promise<PoolConnection> => {
  const getConnectionAsync = promisify(pool.getConnection).bind(pool);
  const connection: PoolConnection = await getConnectionAsync();
  return connection;
};

export const poolQueryMySQL = async (connection: PoolConnection, query: string, values?: any[]): Promise<any> => {
  const queryAsync = promisify(connection.query).bind(connection);
  const result = await queryAsync({ sql: query, values });
  return result;
};
