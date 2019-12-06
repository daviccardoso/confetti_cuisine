const subscribersController = require('./controllers/subscribersController');
const coursesController = require('./controllers/coursesController');
const errorController = require('./controllers/errorController');
const usersController = require('./controllers/usersController');
const homeController = require('./controllers/homeController');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const connectFlash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passcodes = require('./passcodes');
const mongoose = require('mongoose');
const layouts = require('express-ejs-layouts');
const express = require('express');
const router = express.Router();
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://localhost:27017/recipe_db',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

// Application settings
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(layouts);
app.use(connectFlash());
app.use(cookieParser(passcodes.cookieParserSecretPasscode));
app.use(expressSession({
  secret: passcodes.expressSessionSecretPasscode,
  cookie: {
    maxAge: 3600000
  },
  resave: false,
  saveUninitialized: false
}));
app.use('/', router);
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

// Home
router.get('/',
  homeController.index);

// Courses
router.get('/courses',
  coursesController.index,
  coursesController.indexView);

router.get('/courses/new',
  coursesController.newCourse);

router.post('/courses/create',
  coursesController.create,
  coursesController.redirectView);

router.get('/courses/:id',
  coursesController.show,
  coursesController.showView);

router.get('/courses/:id/edit',
  coursesController.edit);

router.put('/courses/:id/update',
  coursesController.update,
  coursesController.redirectView);

router.delete('/courses/:id/delete',
  coursesController.deleteCourse,
  coursesController.redirectView);

// Users
router.get('/users',
  usersController.index,
  usersController.indexView);

router.get('/users/new',
  usersController.newUser);

router.post('/users/create',
  usersController.create,
  usersController.redirectView);

router.get('/users/:id',
  usersController.show,
  usersController.showView);

router.get('/users/:id/edit',
  usersController.edit);

router.put('/users/:id/update',
  usersController.update,
  usersController.redirectView);

router.delete('/users/:id/delete',
  usersController.deleteUser,
  usersController.redirectView);

// Subscribers
router.get('/subscribers',
  subscribersController.index,
  subscribersController.indexView);

router.get('/subscribers/new',
  subscribersController.newSubscriber);

router.post('/subscribers/create',
  subscribersController.create);

router.get('/subscribers/:id',
  subscribersController.show,
  subscribersController.showView);

router.get('/subscribers/:id/edit',
  subscribersController.edit);

router.put('/subscribers/:id/update',
  subscribersController.update,
  subscribersController.redirectView);

router.delete('/subscribers/:id/delete',
  subscribersController.deleteSubscriber,
  subscribersController.redirectView);

// Middleware error functions
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
  console.log(
    `Server running at http://localhost:${
    app.get('port')
    }`);
});
