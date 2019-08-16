const errorController = require('./controllers/errorController');
const homeController = require('./controllers/homeController');
const layouts = require('express-ejs-layouts');
const express = require('express');
const MongoDB = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017';
const dbName = 'recipe_db';
const app = express();

MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;
  const db = client.db(dbName);
  db.collection('contacts')
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });
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
