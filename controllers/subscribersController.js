const Subscriber = require('../models/subscriber');

function getSubscriptionPage(req, res) {
  res.render('contact');
}

function getAllSubscribers(req, res) {
  Subscriber.find({})
    .then(subscribers => res.render('subscribers', { subscribers }))
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .finally(() => console.log('Promise complete.'));
}

function saveSubscriber(req, res) {
  Subscriber.create({ ...{ name, email, zipCode } = req.body })
    .then(() => res.render('thanks'))
    .catch(error => res.send(error))
}

module.exports = { saveSubscriber, getSubscriptionPage, getAllSubscribers };
