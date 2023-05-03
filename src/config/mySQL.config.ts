import mysql from "mysql2";
import config from "../config/config";
import Pool from "mysql2/typings/mysql/lib/Pool";

type queryValue = Array<string | number | boolean | null | undefined> | string;

const params = {
  connectionLimit: 1000,
  user: config.MySQL.username,
  password: config.MySQL.password,
  host: config.MySQL.host,
  database: config.MySQL.database,
};

export const connect = () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect((error) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(connection);
    });
  });

export const queryMySQL = async (connection: mysql.Connection, query: string, values?: queryValue) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};
