import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthUserContext } from '../../src/utils/Session';

const User = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Container>
          <h1>Account Details</h1>

          <div>Email: {authUser.email}</div>
          <div>Name: {authUser.displayName}</div>
          <div>Phone Number: {authUser.phoneNumber}</div>

        </Container>
      )}
    </AuthUserContext.Consumer>
  );
};

export default User;
