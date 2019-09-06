const Subscriber = require('../models/subscriber');

function index(req, res) {
  Subscriber.find({})
    .then(subscribers => res.render('subscribers/index', { subscribers }))
    .catch(error => {
      console.log(error.message);
      return [];
    });
}

function newSubscriber(req, res) {
  res.render('contact');
}

function create(req, res) {
  Subscriber.create({ ...{ name, email, zipCode } = req.body })
    .then(() => res.render('thanks'))
    .catch(error => res.send(error))
}

function show(req, res, next) {
  const subscriberId = req.params.id;

  Subscriber.findById(subscriberId)
    .then(subscriber => {
      res.locals.subscriber = subscriber;
      next()
    })
    .catch(error => {
      console.log(`Error fetching subscriber by ID: ${error.message}`);
      next(error);
    });
}

function showView(req, res) {
  res.render('subscribers/show');
}

module.exports = { index, newSubscriber, create, show, showView };
