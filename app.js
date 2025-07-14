const { router } = require('./core/router');
const { useMiddleware } = require('./core/middleware');
const logger = require('./middlewares/logger');

// Register route
require('./routes/index.route');
require('./routes/user.route');

module.exports = (req, res) => {
  useMiddleware(req, res, [
    logger, // middleware
    router  // router di akhir
  ]);
};
