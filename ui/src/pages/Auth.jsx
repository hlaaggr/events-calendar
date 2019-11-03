import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import { Redirect } from 'react-router-dom';

const Auth = ({ user }) => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const loggedOutView = () => {
    return isLoginPage ? <LoginForm setIsLoginPage={setIsLoginPage} /> : <SignUpForm setIsLoginPage={setIsLoginPage} />
  }

  return (
    <> 
      {user ? <Redirect to="/user"/> : loggedOutView() }
    </>
  );
};

export default Auth;


// import LogoutButton from '../components/LogoutButton';
// import PasswordForgetForm from '../components/PasswordForgetForm';
// <br />
  // <LogoutButton />
  // <br />
  // <PasswordForgetForm /> 
  // reset should also be under user