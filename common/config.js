const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../.env')
});

module.exports = {
  API_TOKEN: process.env.API_TOKEN,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING
}