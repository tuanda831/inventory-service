const dotenv = require('dotenv');
const path = require('path');

if (process.env.ENVIRONMENT === 'dev') {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
} else if (process.env.ENVIRONMENT === 'ci') {
  dotenv.config({ path: path.resolve(__dirname, 'ci.env') });
}

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB__HOST,
      port: process.env.DB__PORT,
      database: process.env.DB__NAME,
      user: process.env.DB__USER,
      password: process.env.DB__PASSWORD
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
