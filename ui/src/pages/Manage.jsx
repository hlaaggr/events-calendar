import React from 'react';
import { withAuthorization } from '../utils/Session';

const Manage = () => {
  return (
    <div>
      This is the page that the admin will manage pending events from.
    </div>
  );
}

const condition = authUser => authUser && authUser.email === "hlaa-grr@hearingloss-grr.org";

export default withAuthorization(condition)(Manage);
