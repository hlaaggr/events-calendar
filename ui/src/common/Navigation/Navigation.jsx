import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../utils/Session';
import PropTypes from 'prop-types';
import LogoutButton from '../../components/LogoutButton';


const Navigation = () => {
  return (
    <nav>
      <li>
        <Link to="/">Home</Link>
      </li>
      
      <li>
        <Link to="/event">Event</Link>
      </li>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser 
          ? <AuthNavigation />
          : (
            <li>
              <Link to="/auth">Sign In</Link>
            </li> 
          )
        }
      </AuthUserContext.Consumer>
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
