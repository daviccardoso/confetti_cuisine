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
      next();
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`);
      next(error);
    });
}

function edit(req, res, next) {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      res.render('users/edit', { user });
    })
    .catch(error => {
      console.error(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
}

function update(req, res, next) {
  const userId = req.params.id;
  const userData = {
    'name': {
      'first': req.body.first,
      'last': req.body.last
    },
    'email': req.body.email,
    'password': req.body.password,
    'zipCode': req.body.zipCode
  };

  User.findByIdAndUpdate(userId, {
    $set: userData
  })
    .then(user => {
      res.locals.redirect = `/users/${userId}`;
      next()
    })
    .catch(error => {
      console.error(`Error updating user by ID: ${error.message}`);
      next(error);
    });
}

function deleteUser(req, res, next) {
  const userId = req.params.id;

  User.findByIdAndRemove(userId)
    .then(() => {
      res.locals.redirect = '/users';
      next();
    })
    .catch(error => {
      console.log(`Error deleting user by ID: ${error.message}`);
      next(error);
    });
}

function show(req, res, next) {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
}

function showView(req, res) {
  res.render('users/show');
}

function redirectView(req, res, next) {
  const redirectPath = res.locals.redirect;

  if (redirectPath) res.redirect(redirectPath);
  else next();
}

module.exports = {
  index,
  indexView,
  newUser,
  create,
  edit,
  update,
  deleteUser,
  show,
  showView,
  redirectView
};
