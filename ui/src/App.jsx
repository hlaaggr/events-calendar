import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { AuthUserContext } from './utils/Session';
import { withFirebase } from './utils/Firebase';
import { withAuthentication } from './utils/Session';
import withAuthProtection from './utils/withAuthProtection';

import {
  Home,
  Event,
  Auth,
  User,
} from './pages/';  
import Navigation from './common/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

const App = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route  
        path="/user"
      >
        <User />
      </Route>
      <Route path="/event" component={Event} />
      <Route path="/auth" component={Auth} />
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>    
);

export default withAuthentication(App);

