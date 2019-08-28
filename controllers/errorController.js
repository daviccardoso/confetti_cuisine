const httpStatus = require('http-status-codes');

function pageNotFound(req, res) {
  res.status(httpStatus.NOT_FOUND);
  res.render('error', { title: 'Page Not Found' });
}

function internalServerError(error, req, res) {
  const errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred | ${error.stack}`);
  res.status(errorCode);
  res.end(`${errorCode} | Sorry, our application is taking a nap!`);
}

module.exports = { pageNotFound, internalServerError };
