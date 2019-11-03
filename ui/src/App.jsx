import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  Home,
  Auth,
  User,
  NewEvent,
  Manage,
} from './pages';  
import { withAuthentication } from './utils/Session';
import Navigation from './common/Navigation';
import PasswordForgetForm from './components/PasswordForgetForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

const App = ({ firebase: { auth : { currentUser } } }) => (
  <Router>
    <Navigation user={currentUser}/>
    <Switch>
      <Route path="/user">
        <User user={currentUser}/>
      </Route>
      <Route path="/auth">
        <Auth user={currentUser}/>
      </Route>
      <Route path="/forgot">
        <PasswordForgetForm />
      </Route>
      <Route path="/event">
        <NewEvent user={currentUser} />
      </Route>
      <Route path="/manage">
        <Manage user={currentUser} />
      </Route>
      <Route path="/">
        <Home user={currentUser}/>
      </Route>
    </Switch>
  </Router>
);

export default withAuthentication(App);

