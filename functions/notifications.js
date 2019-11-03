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
    const data = {event, userProfile}

    template = '<h1> Hello {{userProfile.email}} please go to {{event.eventTitle}}</h1>';
    template = handlebars.compile(template);
    //return `Hi ${userProfile.email}, ${event.eventTitle} is happening on ${moment(event.event_begins).toISOString()}`;
    return template(data)
  },
  event_changed(event, userProfile) {
    return `Hi ${userProfile.email}, ${event.eventTitle} has changed`;
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

