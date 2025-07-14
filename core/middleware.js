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