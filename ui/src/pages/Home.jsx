import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

import PropTypes from 'prop-types';
import { EventsCalendar } from '../components/EventsCalendar';

import '../styles/home.scss';
import AddEventButton from '../components/AddEventButton';

const CALENDAR_ID = 'hlaa-ggr@hearingloss-ggr.org';
const API_KEY = 'AIzaSyCEE4HXsxiGA3uh-oD8rLo_egoENeQNmvU'
const hlaaCalendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [], // holds all events fetched from google calendar
      filteredEvents: [], // holds events which fall under the filters
      allLocations: [], // holds filter options for locations
      allOrganizers: [], // holds filter options for organizers
      selectedLocations: [], // holds selected locations
      selectedOrganizers: [] // holds selcted organizers
    }
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
  }

  componentDidMount() {
   this.fetchCalendarEvents();
  }

  fetchCalendarEvents() {
    let events = [];
    let allLocations = []; // will be used to filter out events by location
    let allOrganizers = []; // will be used to filter out events by organizer

    fetch(hlaaCalendarUrl)
      .then(response => response.json())
      .then(results => {
        let eventsData = results.items;

        eventsData.map((event) => {
          const { summary, description, location, start, end, organizer: { email } } = event; 
          events.push({
            title: summary,
            description: description,
            start: start.date || start.dateTime,
            end: end.date || end.dateTime,
            location: location,
            organizer: email
          });
          if (location) {
            // ex of location: "Start Garden, 40 Pearl St NW #200, Grand Rapids, MI 49503, USA"
            const locationName = location.split(',')[0]; // ==> Start Garden
            if (!allLocations.map(ea => ea.label).includes(locationName)) {
              // don't want to show the same location as multiple options
              allLocations.push({ label: locationName, value: location });
            }
          }
          const organizerName = email.split('@')[0];
          if (!allOrganizers.map(ea => ea.label).includes(organizerName)) {
            allOrganizers.push({ label: organizerName, value: email });
          }
        });
        this.setState({ events, allLocations, allOrganizers })
      });
  }

  handleFilterSelect(selectedOptions, event) {
    let filteredEvents = [];
    const allEvents = [...this.state.events];

    switch(event.name) {
      case "Location":
        this.setState({ selectedLocations: selectedOptions }, () => {
          if (selectedOptions) {
            const optionValues = selectedOptions.map(ea => ea.value)
            filteredEvents = allEvents.filter((ea) => {
              return ea.location && ea.location.includes(optionValues)
            });

            this.setState({ filteredEvents })
          } else if (!this.state.selectedOrganizers) {
            this.setState({ filteredEvents: [] })
          }
        })
        break;
      case "Organizer":
        this.setState({ selectedOrganizers: selectedOptions }, () => {
          if (selectedOptions) {
            const optionValues = selectedOptions.map(ea => ea.value)
            filteredEvents = allEvents.filter((ea) => {
              return ea.organizer && ea.organizer.includes(optionValues)
            });

            this.setState({ filteredEvents })
          } else if (!this.state.selectedLocations) {
            this.setState({ filteredEvents: [] })
          }
        })
        break;
      default: 
        break;
    }
  }

  render() {
    const { events, filteredEvents, allLocations, allOrganizers, selectedLocations, selectedOrganizers } = this.state;
    const { user } = this.props;
    return (
      <Container className="home">
        <h1>HLAA Events Calendar</h1>
        <AddEventButton user={user} />
        <EventsCalendar 
          events={filteredEvents.length ? filteredEvents : events} 
          views={["month"]}
          popup={true}
        />
        <Row className="home__filters">
          <Col xs={6}>
            <Select
              name="Location"
              placeholder="Select Locations"
              value={selectedLocations}
              onChange={(option, event) => this.handleFilterSelect(option, event)}
              options={allLocations}
              isMulti={true}
            />
          </Col>
          <Col xs={6}>
            <Select
              name="Organizer"
              placeholder="Select Organizers"
              value={selectedOrganizers}
              onChange={(option, event) => this.handleFilterSelect(option, event)}
              options={allOrganizers}
              isMulti={true}
            />
          </Col>
        </Row>
      </Container>
    );
  }
};


Home.propTypes = {
  
};

export default Home;
