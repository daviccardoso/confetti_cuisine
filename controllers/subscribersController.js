const Subscriber = require('../models/subscriber');
const mongoose = require('mongoose');

exports.getSubscriptionPage = (req, res) => res.render('contact');

exports.getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .then(subscribers => res.render('subscribers', { subscribers }))
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .finally(() => console.log('Promise complete.'));
};

exports.saveSubscriber = (req, res) => {
  Subscriber.create({ ...{ name, email, zipCode } = req.body })
    .then(() => res.render('thanks'))
    .catch(error => res.send(error))
};
