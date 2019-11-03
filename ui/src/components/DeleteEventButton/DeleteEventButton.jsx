import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../utils/Firebase';

const DeleteEventButton = () => {
  const handleDeleteEvent = (eventId) => {
    // call delete event API method
  }
  return (
    <div>
      <button type="button" className="button button--secondary">
        Delete Account
      </button>
    </div>
  );
}

export default withFirebase(DeleteEventButton);