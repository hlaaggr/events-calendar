import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navigation } from './components/Navigation'
import {
  Home,
  Event,
  Auth,
  User,
} from './pages/';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';


const App = () => {
  return (
    <Router>
      <Navigation/>
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
