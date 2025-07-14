const routes = [];

function addRoute(method, path, handler) {
  routes.push({ method, path, handler });
}

function router(req, res) {
  const match = routes.find(
    r => r.method === req.method && r.path === req.url
  );
  if (match) return match.handler(req, res);
  res.writeHead(404); res.end('Not Found');
}

module.exports = { router, addRoute };