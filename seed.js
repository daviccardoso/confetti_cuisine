const mongoose = require('mongoose');
const Subscriber = require('./models/subscriber');

mongoose.connect('mongodb://localhost:27017/recipe_db', {
  useNewUrlParser: true
});

const db = mongoose.connection;
const contacts = [
  {
    name: 'Jon Wexler',
    email: 'jon@jonwexler.com',
    zipCode: 10016
  },
  {
    name: 'Chef Eggplant',
    email: 'eggplant@recipeapp.com',
    zipCode: 20331
  },
  {
    name: 'Professor Souffle',
    email: 'souffle@recipeapp.com',
    zipCode: 19103
  }
];

Subscriber.deleteMany()
  .exec()
  .then(() => console.log('Subscriber data is empty!'));

Subscriber.create(contacts)
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
    mongoose.connection.close();
  })
  .catch(error => console.error(`ERROR: ${error}`));
