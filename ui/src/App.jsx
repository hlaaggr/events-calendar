import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { withAuthentication } from './utils/Session';

import {
  Home,
  Auth,
  User
} from './pages';  
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

