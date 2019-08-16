const httpStatus = require('http-status-codes');

exports.pageNotFound = (req, res) => {
  res.status(httpStatus.NOT_FOUND);
  res.render('error', { title: 'Page Not Found'});
};

exports.internalServerError = (error, req, res, next) => {
  const errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred | ${error.stack}`);
  res.status(errorCode);
  res.end(`${errorCode} | Sorry, our application is taking a nap!`);
};
