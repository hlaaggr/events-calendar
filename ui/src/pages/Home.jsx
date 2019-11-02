import React from 'react';
import PropTypes from 'prop-types';
import { EventsCalendar } from '../components/EventsCalendar'


const CALENDAR_ID = 'hlaa-calendar-app-service@hlaa-calendar-257804.iam.gserviceaccount.com';
const API_KEY = '5681624bc3c392fca498039c0d35c4a07fc6d46e' // need to check this key, doesnt seem to be working
const hlaaCalendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

const Home = () => {
  return (
    <div>
      Home Page
      <EventsCalendar events={[]}/>
    </div>
  );
};


Home.propTypes = {
  
};


export default Home;
