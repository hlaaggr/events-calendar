import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from '../images/logo.jpg';

import '../styles/navigation.scss'


export const Navigation = () => {
  return (
    <Navbar bg="light" variant="light">
      <Link to="/">
        {/* do they have a transparent logo? */}
        {/* also should update the favicon */}
        <img src={logo} alt="hlaa logo" height={80}/>
      </Link>
      <Nav className="ml-auto">
        <Link to="/" className="navbar__link">Home</Link>
        <Link to="/user" className="navbar__link">My Account</Link>
        <Link to="/event" className="navbar__link">Event</Link>
        <Link to="/auth" className="navbar__link">Sign Up / Sign In </Link>
      </Nav>
    </Navbar>
  );
}
