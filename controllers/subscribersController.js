const Subscriber = require('../models/subscriber');
const mongoose = require('mongoose');

exports.getAllSubscribers = (req, res, next) => {
  Subscriber.find({}, (error, subscribers) => {
    if (error) next(error);
    req.data = subscribers;
    next();
  });
};

exports.getSubscriptionPage = (req, res) => res.render('contact');
exports.saveSubscriber = (req, res) => {
  Subscriber.create({
    'name': req.body.name,
    'email': req.body.email,
    'zipCode': req.body.zipCode
  }, (error, result) => {
    if (error) res.send(error);
    res.render('thanks');
  });
};
