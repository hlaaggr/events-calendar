import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../utils/Firebase';

const DeleteEventButton = ({ eventId, firebase, }) => {
  const handleDeleteEvent = () => {
    firebase.
      doDeleteEvent(eventId)
        .catch((error) => {
          console.error(error);
        })
  }
  return (
    <div>
      <button onClick={handleDeleteEvent} type="button" className="button button--secondary">
        Reject Event
      </button>
    </div>
  );
}

export default withFirebase(DeleteEventButton);