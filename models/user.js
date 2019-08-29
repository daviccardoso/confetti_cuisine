const mongoose = require('mongoose');
const Subscriber = require('./subscriber');
const { Schema } = mongoose;
const userSchema = Schema(
  {
    'name': {
      'first': {
        type: String,
        trim: true
      },
      'last': {
        type: String,
        trim: true
      }
    },
    'email': {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    'zipCode': {
      type: Number,
      min: [10000, 'Zip code too short'],
      max: 99999
    },
    'password': {
      type: String,
      required: true
    },
    'courses': [{
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }],
    'subscribedAccount': {
      type: Schema.Types.ObjectId,
      ref: 'Subscriber'
    }
  },
  {
    timestamp: true
  }
);

userSchema.virtual('fullName')
  .get(function() {
    return `${this.name.first} ${this.name.last}`;
  });

userSchema.pre('save', function(next) {
  if (!this.subscribedAccount) {
    Subscriber.findOne({ email: this.email })
      .then(subscriber => {
        this.subscribedAccount = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error);
      })
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);
