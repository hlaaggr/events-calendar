import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../utils/Session';
import LogoutButton from '../../components/LogoutButton';
import logo from '../../images/HLAAGGR_logo_webwhite.png';

import '../../styles/navigation.scss'

const Navigation = () => {
  return (
    <Navbar>
      <Link to="/" className="navbar__brand">
        <img src={logo} alt="hlaa logo" height={80} />
      </Link>
      <Nav className="ml-auto">
        <Link to="/" className="navbar__link">Home</Link>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser 
            ? <AuthNavigation />
            : (
              <Link to="/auth" className="navbar__link">Sign In</Link>
            )
          }
        </AuthUserContext.Consumer>
      </Nav>
    </Navbar>
  );
};

const AuthNavigation = () => {
  return (
    <>
      <Link to="/user" className="navbar__link">My Account</Link>
      <LogoutButton />
    </>
  );
}

export default Navigation;
