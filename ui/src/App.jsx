import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  Home,
  Event,
  Auth,
  User,
} from './pages/';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user">My Account</Link>
        <Link to="/event">Event</Link>
        <Link to="/auth">Sign Up / Sign In</Link>
      </nav>
      <Switch>
        <Route exact path="/user">
          <User />
        </Route>
        <Route path="/event">
          <Event />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
