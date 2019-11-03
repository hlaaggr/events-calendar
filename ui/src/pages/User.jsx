import React from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { withAuthorization } from '../utils/Session';

const User = ({ user }) => {
  return (
      user ? (
        <Container>
          <h1>Account Details</h1>

          <div>Email: {user.email}</div>
          <div>Name: {user.displayName}</div>
          <div>Phone Number: {user.phoneNumber}</div>

        </Container>
      ): (
        <Redirect to="/auth"/>
      )
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(User);
