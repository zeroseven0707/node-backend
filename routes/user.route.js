const { addRoute } = require('../core/router');
const { userController } = require('../controllers/user.controller');

addRoute('GET', '/users', userController.index);
addRoute('POST', '/users', userController.create);