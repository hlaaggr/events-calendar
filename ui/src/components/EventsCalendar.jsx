import React from 'react';
import { Container, Popover, OverlayTrigger } from 'react-bootstrap'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/sass/styles.scss';
import '../styles/calendar.scss';

const localizer = momentLocalizer(moment)

export const EventsCalendar = ({ events }) => {

  return (
    <Container className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events || []}
        components={{
          event: EventDetails
        }}
        views={{month: true}}
        selectable={true}
        popup={true}
        startAccessor="start"
        endAccessor="end"
      />
    </Container>
  );
}


const EventDetails = ({ event }) => {
  const popoverClickRootClose = (
    <Popover 
      id="popover-trigger-click-root-close"
      className="popover"
    >
      <h1 className="popover__title">{event.title}</h1> 
      <h2 className="popover__description">{event.description}</h2>
      <div className="popover__times">
        {moment(event.start).format("dddd, MMMM Do, h:mm a")}
      </div>
      <div className="popover__location">
        <a href={`https://www.google.com/maps/search/?api=1&query=${event.location}`} target="_blank">
          {event.location}
        </a>
      </div>
      <div className="popover__organizer">
        <label>Created By: </label>
        <span>{event.organizer.split("@")[0]}</span>
      </div>
    </Popover>
  );

  return (
    <div>
      <div>
        <OverlayTrigger 
          id="help" 
          trigger="click" 
          rootClose 
          container={this}
          placement="top" 
          overlay={popoverClickRootClose}
        >
          <div>{event.title}</div>
        </OverlayTrigger>
      </div>
    </div>
  );
}
