function json(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function success(res, data = {}, message = 'Success') {
  json(res, 200, { success: true, message, data });
}

function error(res, statusCode = 500, message = 'Internal Server Error') {
  json(res, statusCode, { success: false, message });
}

module.exports = {
  json,
  success,
  error
};
