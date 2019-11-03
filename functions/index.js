const functions = require('firebase-functions');
const admin = require('firebase-admin');

const notifications = require('./notifications');

admin.initializeApp();

exports.twoDaysPrior = functions.pubsub.schedule('every 1 mins').onRun(notifications.twoDaysPrior);
exports.twoHoursPrior = functions.pubsub.schedule('every 30 mins from 08:15 to 20:15').onRun(notifications.twoHoursPrior);
exports.postSurvey = functions.pubsub.schedule('every day 15:00').onRun(notifications.postSurvey);
exports.postThanks = functions.pubsub.schedule('every day 15:00').onRun(notifications.postThanks);
