const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../.env')
});

process.env.NTBA_FIX_319 = 1;

module.exports = {
  API_TOKEN: process.env.API_TOKEN,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING
}