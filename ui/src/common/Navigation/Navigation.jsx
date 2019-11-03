import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoutButton from '../../components/LogoutButton';
import logo from '../../images/HLAAGGR_logo_webwhite.png';

import '../../styles/navigation.scss'

const Navigation = ({ user }) => {
  return (
    <Navbar>
      <Link to="/" className="navbar__brand">
        <img src={logo} alt="hlaa logo" height={80} />
      </Link>
      <Nav className="ml-auto">
        <Link to="/" className="navbar__link">Home</Link>
          {user ? (
            <AuthNavigation />
          ) : (
              <Link to="/auth" className="navbar__link">Sign In</Link>
            )
          }
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
