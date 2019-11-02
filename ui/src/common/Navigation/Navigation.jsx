import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoutButton from '../../components/LogoutButton';


const Navigation = ({ authUser }) => {
  return (
    <nav>
      <li>
        <Link to="/">Home</Link>
      </li>
      
      <li>
        <Link to="/event">Event</Link>
      </li>
      {authUser
        ? <AuthNavigation />
        : (
          <li>
            <Link to="/auth">Sign In</Link>
          </li> 
        )}
      
    </nav>
  );
};

const AuthNavigation = () => {
  return (
    <>
      <li>
        <Link to="/user">My Account</Link>
      </li>
      <li>
        <LogoutButton />
      </li>
    </>
  );
}

Navigation.propTypes = {
  
};


export default Navigation;
