const admin = require('firebase-admin');
const functions = require('firebase-functions');
const moment = require('moment');
const cors = require('cors')({
  origin: true,
});
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

const SUBJECT = 'HLAA Greater Grand Rapids';

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const templates = {
  two_days_prior(event, userProfile) {
<<<<<<< HEAD
    const data = {event, userProfile}

    template = '<h1> Hello {{userProfile.email}} please go to {{event.eventTitle}}</h1>';
    template = handlebars.compile(template);
    //return `Hi ${userProfile.email}, ${event.eventTitle} is happening on ${moment(event.event_begins).toISOString()}`;
    return template(data)
=======
    return `Hi ${userProfile.email}, ${event.eventTitle} is happening in 2 day son ${moment(event.event_begins).toISOString()}`;
  },
  two_hours_prior(event, userProfile) {
    return `Hi ${userProfile.email}, ${event.eventTitle} is happening in 2 hours on ${moment(event.event_begins).toISOString()}`;
>>>>>>> cddcbaeee5cf1c9ccfae894955f1fe41214aad50
  },
  event_changed(event, userProfile) {
    return `Hi ${userProfile.email}, ${event.eventTitle} has changed`;
  },
  post_survey(event, userProfile) {
    return `Hi ${userProfile.email}, how was ${event.eventTitle}?`;
  },
  post_thanks(event, userProfile) {
    return `Hi ${userProfile.email}, thanks for going to ${event.eventTitle}!`;
  },
};

const notifyUser = (userId, event, template) => {
  return admin.firestore()
    .collection("user_profiles")
    .doc(userId)
    .get()
    .then((userProfile) => {
      const templateData = templates[template](event.data(), userProfile.data());
      console.log('user profile')
      console.log(userProfile.data().email)
      sendEmail(userProfile.data().email, templateData)
    });
};

const notifyEvent = (event, template) => {
  console.log(event);
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
      console.log(events);
      events.forEach((event) => {
        notifyEvent(event, 'two_days_prior');
      });
    });
};

exports.twoHoursPrior = () => {
  const start = moment().add(2, 'hours').startOf('hour').toDate();
  const end = moment().add(2, 'hours').endOf('hour').toDate();

  return getEventsInRange(start, end)
    .then((events) => {
      events.forEach((event) => {
        notifyEvent(event, 'two_hours_prior');
      });
    });
};

exports.postSurvey = () => {
  const start = moment().subtract(1, 'day').startOf('day').toDate();
  const end = moment().subtract(1, 'day').endOf('day').toDate();

  return getEventsInRange(start, end)
    .then((events) => {
      events.forEach((event) => {
        notifyEvent(event, 'post_survey');
      });
    });
};

exports.postSurvey = () => {
  const start = moment().subtract(2, 'days').startOf('day').toDate();
  const end = moment().subtract(2, 'days').endOf('day').toDate();

  return getEventsInRange(start, end)
    .then((events) => {
      events.forEach((event) => {
        notifyEvent(event, 'post_thanks');
      });
    });
};

exports.eventChanged = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(403).send('Forbidden!');
  }

  return cors(req, res, () => {
    const { eventId } = req.query;
    return admin.firestore()
      .collection("events")
      .doc(eventId)
      .get()
      .then((event) => {
        notifyEvent(event, 'event_changed');
        return res.status(200).send(`RSVPS for ${event.eventTitle} were notified`);
      });
  });
};

async function sendEmail(email, html) {
  const mailOptions = {
    from: `${SUBJECT} <events@hearinglogss-ggr.com>`,
    to: email,
    subject: `Hello from ${SUBJECT}!`,
    html: html
  };

  await mailTransport.sendMail(mailOptions);
  console.log('New email sent to:', email);
  return null;
}

