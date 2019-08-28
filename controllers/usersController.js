const User = require('../models/user');

function index(req, res, next) {
  User.find({})
    .then(users => {
      res.locals.users = users;
      next();
    })
    .catch(error => {
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    });
}

function indexView(req, res) {
  res.render('users/index');
}

module.exports = { index, indexView };
