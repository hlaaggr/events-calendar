import React from 'react';
import { withFirebase } from '../../utils/Firebase';

const LogoutButton = ({ firebase }) => (
  <button onClick={firebase.doSignOut} className="navbar__link button button--secondary">
    Sign Out
  </button>
);

export default withFirebase(LogoutButton);