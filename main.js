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

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

const subscriber1 = new Subscriber({
  'name': 'Jon Wexler',
  'email': 'jon@jonwexler.com'
});

subscriber1.save((error, savedDocument) => {
  if (error) console.error(error);
  console.log(savedDocument);
});

Subscriber.create({
  'name': 'Helena Cardoso',
  'email': 'helena@davicardoso.com'
}, (error, savedDocument) => {
  if (error) console.error(error);
  console.log(savedDocument);
});

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
