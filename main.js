const subscribersController = require('./controllers/subscribersController');
const coursesController = require('./controllers/coursesController');
const errorController = require('./controllers/errorController');
const usersController = require('./controllers/usersController');
const homeController = require('./controllers/homeController');
const layouts = require('express-ejs-layouts');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://localhost:27017/recipe_db',
  { useNewUrlParser: true }
);

// Application settings
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(layouts);
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

// Home
app.get('/', homeController.index);

// Courses
app.get('/courses', coursesController.index);

// Users
app.get('/users', usersController.index, usersController.indexView);
app.get('/users/new', usersController.newUser);
app.get('/users/:id', usersController.show, usersController.showView);
app.post('/users/create', usersController.create, usersController.redirectView);

// Subscribers
app.get('/subscribers', subscribersController.index);
app.get('/contact', subscribersController.newSubscriber);
app.get('/subscribe', subscribersController.newSubscriber);
app.get('/subscribers/:id', subscribersController.show, subscribersController.showView);
app.post('/subscribers/create', subscribersController.create);

// Middleware error functions
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
  console.log(
    `Server running at http://localhost:${
    app.get('port')
    }`);
});
