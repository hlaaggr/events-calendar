import React from 'react';
import Container from 'react-bootstrap/Container'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/sass/styles.scss';
import './calendar.scss';

const localizer = momentLocalizer(moment)

export const EventsCalendar = ({events}) => {

  return (
    <Container className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events || []}
        startAccessor="start"
        endAccessor="end"
      />
    </Container>
  );
}
