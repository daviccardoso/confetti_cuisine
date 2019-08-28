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

function newUser(req, res) {
  res.render('users/new');
}

function create(req, res, next) {
  User.create({
    'name': {
      'first': req.body.first,
      'last': req.body.last
    },
    'email': req.body.email,
    'password': req.body.password,
    'zipCode': req.body.zipCode
  })
    .then(user => {
      res.locals.redirect = '/users';
      res.locals.users = user;
      next();
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`);
      next(error);
    });
}

function redirectView(req, res, next) {
  const redirectPath = res.locals.redirect;

  if (redirectPath) res.redirect(redirectPath);
  else next();
}

module.exports = { index, indexView, newUser, create, redirectView };
