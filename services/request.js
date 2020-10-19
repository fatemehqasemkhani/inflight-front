const { create } = require('apisauce');

const baseURL = process.env.BASE_URL || 'http://localhost:5000';

// Set header and base url
const request = (() => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return create({
    baseURL,
    headers,
  });
})();

module.exports = { request };
