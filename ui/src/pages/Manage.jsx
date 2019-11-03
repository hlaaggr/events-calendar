import React from 'react';
import { withAuthorization } from '../utils/Session';

const Manage = () => {
  return (
    <div>
      This is the page that the admin will manage pending events from.
    </div>
  );
}

const condition = userAuth => userAuth.role === "ADMIN";

export default withAuthorization(condition)(Manage);
