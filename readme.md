### Node.js Vanilla REST API – Struktur Modular & Best Practice
Membangun REST API tanpa framework seperti Express, namun tetap dengan struktur modular, clean, dan scalable.

#### Struktur Folder
```
node-api/
├── server.js               # Entry point utama untuk menjalankan server
├── app.js                  # Menginisialisasi middleware & routing
├── core/
│   ├── router.js           # Router kustom untuk mapping endpoint
│   ├── response.js         # (Opsional) Helper untuk response
│   └── middleware.js       # Middleware engine manual
├── routes/
│   ├── index.route.js      # Route untuk halaman root
│   └── user.route.js       # Route terkait user
├── controllers/
│   └── user.controller.js  # Logika (handler) untuk endpoint user
├── middlewares/
│   └── logger.js           # Middleware contoh (logger)
├── utils/
│   └── parseBody.js        # Helper untuk parsing body dari request

```

#### File dan Fungsi
##### server.js
Menjalankan server dan mengarahkannya ke app.js.
```
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```
##### app.js
Menangani middleware dan routing utama.
```
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

```
##### core/router.js
Router manual yang memetakan URL ke handler.
```
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
```
##### core/middleware.js
Engine middleware manual seperti di Express.
 ```
 function useMiddleware(req, res, middleware) {
  let index = 0;
  function next() {
    const fn = middleware[index];
    index++;
    if (fn) fn(req, res, next);
  }
  next();
}
module.exports = { useMiddleware };
```
##### middlewares/logger.js
Middleware logging untuk mencetak setiap request.
```
module.exports = function(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
};
```
##### routes/user.route.js
Routing untuk resource /users.
```
const { addRoute } = require('../core/router');
const { userController } = require('../controllers/user.controller');

addRoute('GET', '/users', userController.index);
addRoute('POST', '/users', userController.create);
```
##### controllers/user.controller.js
Handler untuk endpoint user.
 ```
 const { parseBody } = require('../utils/parseBody');

const userController = {
  index: (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ id: 1, name: 'Sihab' }]));
  },
  create: async (req, res) => {
    const data = await parseBody(req);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User ${data.name} created.` }));
  }
};

module.exports = { userController };

 ```
##### utils/parseBody.js
Helper untuk membaca body dari request (POST/PUT).
 ```
 function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = { parseBody };

 ```

 ### ✅ Hasil Akhir: API Murni Node.js Tapi Kuat
Composable: route & controller bisa ditambah

Reusable: middleware bisa diatur pakai array

Clean: arsitektur MVC-like tanpa Express

Bisa ditambah WebSocket juga (pakai ws modular)