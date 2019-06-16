import * as knex from 'knex';
import {
  DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT,
  DB_USERNAME,
} from './config';

const pool = knex({
  client: 'mysql',
  connection: {
    host: DB_HOST,
    user: DB_USERNAME,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_NAME,
    charset: 'utf8',
  },
});

export default pool;
