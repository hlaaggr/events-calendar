const functions = require('firebase-functions');
const admin = require('firebase-admin');

const notifications = require('./notifications');

admin.initializeApp();

exports.twoDaysPrior = functions.pubsub.schedule('every 1 mins').onRun(notifications.twoDaysPrior);
