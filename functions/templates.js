const moment = require('moment')

exports.templates = {
  two_days_prior(event) {
    return `${event.title} is happening on ${moment(event.event_begins).toISOString()}`
  }
}
