import React from 'react';
import { withFirebase } from '../../utils/Firebase';

const LogoutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(LogoutButton);