import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { EventsCalendar } from './components'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={EventsCalendar} />
      </Switch>
    </Router>
  );
}

export default App;
