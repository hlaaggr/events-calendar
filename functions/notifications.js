const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment')

const templates = require('./templates')

const notifyEvent = (event, template) => {
  const templateData = templates[template](event);
  console.log(templateData);
}

exports.twoDaysPrior = () => {
  const beginning = moment().add(2, 'days').startOf('day').toDate()
  const end = moment().add(2, 'days').endOf('day').toDate()

  return admin.firestore().collection("events")
    .where("event_begins", ">", beginning)
    .where("event_begins", "<", end)
    .get()
    .then((events) => {
      events.forEach((event) => {
        notifyEvent(event.data(), 'two_days_prior')
      })
    })
}
