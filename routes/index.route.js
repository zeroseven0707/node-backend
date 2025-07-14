const { addRoute } = require('../core/router');
const { json } = require('../core/response');

addRoute('GET', '/', (req, res) => {
  json(res, 200, {
    message: 'Welcome to Node.js Vanilla API',
    status: 'OK'
  });
});
