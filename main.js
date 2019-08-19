const errorController = require('./controllers/errorController');
const homeController = require('./controllers/homeController');
const layouts = require('express-ejs-layouts');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const subscriberSchema = mongoose.Schema({
  'name': String,
  'email': String,
  'zipCode': Number
});

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

app.get('/', homeController.showHome);
app.get('/courses', homeController.showCourses);
app.get('/contact', homeController.showSignUp);
app.post('/contact', homeController.postedSignUpForm);
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
  console.log(
    `Server running at http://localhost:${
    app.get('port')
    }`);
});
