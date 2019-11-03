import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../utils/Firebase';
import { withAuthentication } from '../../utils/Session';

const DeleteUserButton = () => {
  handleDelete = (event) => {
    firebase.doDeleteUser(authUser);
  }
  return (
    <button className="button button--secondary">
      Delete Account
    </button>
  );
};

export default compose(
  withFirebase,
  withAuthentication,
)(DeleteUserButton);
