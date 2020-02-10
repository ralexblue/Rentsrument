require('dotenv').config();
const { TEST_DATABASE_URL, DATABASE_URL,NODE_ENV } = require('./src/config')
module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": (NODE_ENV === 'test')
    ? TEST_DATABASE_URL
    : DATABASE_URL,
}
