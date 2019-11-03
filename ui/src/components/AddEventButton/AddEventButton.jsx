import React from 'react';
import { Link } from 'react-router-dom';

const AddEventButton = () => (
  <Link className={`button button--primary`} to="/event">
    + Add Event
  </Link>
);

export default AddEventButton;
