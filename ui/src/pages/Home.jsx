import React from 'react';
import PropTypes from 'prop-types';
import { EventsCalendar } from '../components/EventsCalendar'


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
