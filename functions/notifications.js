const admin = require('firebase-admin');
const moment = require('moment');

const templates = {
  two_days_prior(event) {
    return `${event.title} is happening on ${moment(event.event_begins).toISOString()}`;
  },
};

const notifyEvent = (event, template) => {
  const templateData = templates[template](event);
  console.log(templateData);
};

const getEventsInRange = (start, end) => {
  return admin.firestore().collection("events")
    .where("event_begins", ">", start)
    .where("event_begins", "<", end)
    .get();
};

exports.twoDaysPrior = () => {
  const start = moment().add(2, 'days').startOf('day').toDate();
  const end = moment().add(2, 'days').endOf('day').toDate();

  return getEventsInRange(start, end)
    .then((events) => {
      events.forEach((event) => {
        notifyEvent(event.data(), 'two_days_prior');
      });
    });
};
