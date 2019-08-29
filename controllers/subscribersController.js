const Subscriber = require('../models/subscriber');

function index(req, res) {
  Subscriber.find({})
    .then(subscribers => res.render('subscribers/index', { subscribers }))
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .finally(() => console.log('Promise complete.'));
}

function newSubscriber(req, res) {
  res.render('contact');
}

function create(req, res) {
  Subscriber.create({ ...{ name, email, zipCode } = req.body })
    .then(() => res.render('thanks'))
    .catch(error => res.send(error))
}

module.exports = { index, newSubscriber, create };
