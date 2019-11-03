import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  Home,
  Auth,
  User
} from './pages';  
import { withAuthentication } from './utils/Session';
import Navigation from './common/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

const App = ({ firebase: { auth : { currentUser } } }) => (
  <Router>
    <Navigation user={currentUser}/>
    <Switch>
      <Route path="/user">
        <User user={currentUser}/>
      </Route>
      <Route path="/auth" component={Auth} />
      <Route path="/">
        <Home user={currentUser}/>
      </Route>
    </Switch>
  </Router>    
);

export default withAuthentication(App);

