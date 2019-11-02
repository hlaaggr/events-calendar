import React from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../utils/Firebase/';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import LogoutButton from '../components/LogoutButton';

const Auth = () => {
  return (
    <div>
      <SignUpForm />
      <LoginForm />
      <br />
      <LogoutButton />
    </div>
  );
};


Auth.propTypes = {
  
};


export default Auth;
