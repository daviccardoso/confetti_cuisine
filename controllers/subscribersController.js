const Subscriber = require('../models/subscriber');
const mongoose = require('mongoose');

exports.getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .then(subscribers => res.render('subscribers', { subscribers }))
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .finally(() => console.log('Promise complete.'));
};

exports.getSubscriptionPage = (req, res) => res.render('contact');
exports.saveSubscriber = (req, res) => {
  Subscriber.create({
    'name': req.body.name,
    'email': req.body.email,
    'zipCode': req.body.zipCode
  })
    .then(() => res.render('thanks'))
    .catch(error => res.send(error))
};
