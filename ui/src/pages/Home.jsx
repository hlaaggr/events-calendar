import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { EventsCalendar } from '../components/EventsCalendar';

import '../styles/home.scss';

const CALENDAR_ID = 'hlaa-ggr@hearingloss-ggr.org';
const API_KEY = 'AIzaSyCEE4HXsxiGA3uh-oD8rLo_egoENeQNmvU'
const hlaaCalendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      errors: []
    }
  }

  componentDidMount() {
   this.fetchCalendarEvents();
  }

  fetchCalendarEvents() {
    let events = [];
    fetch(hlaaCalendarUrl)
      .then(response => response.json())
      .then(results => {
        let eventsData = results.items;
        eventsData.map((event) => {
          events.push({
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary
          })
        });
        this.setState({ events })
      });
      // error handling 
  }


  render() {
    const { events } = this.state;
    return (
      <Container className="home">
        <h1>HLAA Events Calendar</h1>
        <EventsCalendar events={events} />
      </Container>
    );
  }
};


Home.propTypes = {
  
};


export default Home;
