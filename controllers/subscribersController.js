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
  res.render('subscribers/new');
}

function create(req, res) {
  Subscriber.create({ ...{ name, email, zipCode } = req.body })
    .then(() => res.render('thanks'))
    .catch(error => res.send(error))
}

function edit(req, res) {
  const subscriberId = req.params.id;

  Subscriber.findById(subscriberId)
    .then(subscriber => res.render('subscribers/edit', { subscriber }))
    .catch(error => {
      console.error(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
};

function update(req, res, next) {
  const subscriberId = req.params.id;
  const subscriberData = { name, email, zipCode } = req.body;

  Subscriber.findByIdAndUpdate(subscriberId, {
    $set: subscriberData
  })
    .then(() => {
      res.locals.redirect = `/subscribers/${subscriberId}`;
      next();
    })
    .catch(error => {
      console.error(`Error updating subscriber by ID: ${error.message}`);
      next(error);
    });
}

function deleteSubscriber(req, res, next) {
  const subscriberId = req.params.id;

  Subscriber.findByIdAndRemove(subscriberId)
    .then(() => {
      res.locals.redirect = '/subscribers';
      next();
    })
    .catch(error => {
      console.error(`Error deleting subscriber by ID: ${error.message}`);
      next(error);
    });
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

function redirectView(req, res) {
  const redirectPath = res.locals.redirect;

  if (redirectPath) res.redirect(redirectPath);
  else next();
}

module.exports = {
  index,
  newSubscriber,
  create,
  edit,
  update,
  deleteSubscriber,
  show,
  showView,
  redirectView
};
