import dotenv from "dotenv";

dotenv.config();

const username = process.env.mysqlUser || "";
const password = process.env.mysqlPassword || "";
const host = process.env.mysqlHost || "";
const database = process.env.mysqlDB || "";
const port = process.env.port || 3001;

const MySQL = {
  username: username,
  password: password,
  host: host,
  database: database,
};

export default {
  MySQL: MySQL,
  port,
};
