const admin = require('firebase-admin');
const moment = require('moment');

const templates = {
  two_days_prior(event, userProfile) {
    return `Hi ${userProfile.email}, ${event.eventTitle} is happening on ${moment(event.event_begins).toISOString()}`;
  },
};

const notifyUser = (userId, event, template) => {
  return admin.firestore()
    .collection("user_profiles")
    .doc(userId)
    .get()
    .then((userProfile) => {
      const templateData = templates[template](event.data(), userProfile.data());
      console.log(templateData);
    });
};

const notifyEvent = (event, template) => {
  const eventRef = admin.firestore().collection('events').doc(event.id);

  return admin.firestore()
    .collection("rsvps")
    .where("event_id", "==", eventRef)
    .get()
    .then((rsvps) => {
      rsvps.forEach((rsvp) => {
        if (rsvp.exists) {
          return notifyUser(rsvp.data().user_id, event, template);
        }
      });
    });
};

const getEventsInRange = (start, end) => {
  return admin.firestore()
    .collection("events")
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
        notifyEvent(event, 'two_days_prior');
      });
    });
};
