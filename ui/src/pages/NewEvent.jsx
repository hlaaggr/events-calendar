import React from 'react';
import { withAuthorization } from '../utils/Session';

const NewEvent = () => {
  return (
    <div>
      Events will be made on this page.
    </div>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewEvent);
