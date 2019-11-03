import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../utils/Firebase';
import { withAuthentication } from '../../utils/Session';

const DeleteUserButton = ({ history, firebase, authUser }) => {
  const handleDelete = (authUser) => {
    firebase.doDeleteUser(authUser)
      .then(() => {
        history.push('./auth');
      });
  }
  return (
    <button className="button button--secondary" onClick={handleDelete(authUser)}>
      Delete Account
    </button>
  );
};

export default compose(
  withRouter,
  withFirebase,
  withAuthentication,
)(DeleteUserButton);
