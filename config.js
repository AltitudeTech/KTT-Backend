const dotenv = require('dotenv');

dotenv.config({ silent: true });
module.exports = {
  JWT_SECRET,
} = process.env;

const defaults = {
  JWT_SECRET: 'your_secret',
};

Object.keys(defaults).forEach((key) => {
  if (!process.env[key] || process.env[key] === defaults[key]) {
    throw new Error(`Please enter a custom ${key} in .env on the root directory`);
  }
});

module.exports = JWT_SECRET;
