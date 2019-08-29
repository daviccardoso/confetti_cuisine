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

const db = mongoose.connection;
db.once('open', () =>
  console.log('Successfully connected to MongoDB using Mongoose!')
);

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(layouts);
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.get('/', homeController.index);
app.get('/courses', coursesController.index);
app.get('/users', usersController.index, usersController.indexView);
app.get('/users/new', usersController.newUser);
app.post('/users/create', usersController.create, usersController.redirectView);
app.get('/subscribers', subscribersController.index);
app.get('/contact', subscribersController.newSubscriber);
app.get('/subscribe', subscribersController.newSubscriber);
app.post('/subscribers/create', subscribersController.create);
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
  console.log(
    `Server running at http://localhost:${
    app.get('port')
    }`);
});
