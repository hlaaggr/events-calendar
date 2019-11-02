import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { withFirebase } from './utils/Firebase';
import withAuthProtection from './utils/withAuthProtection';

import {
  Home,
  Event,
  Auth,
  User,
} from './pages/';  
import Navigation from './common/Navigation';
import LogoutButton from './components/LogoutButton/LogoutButton';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };  
  }  

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },    
    );  
  }  

  componentWillUnmount() {
    this.listener();
  }  

  render() {
    return (
      <Router>
        <Navigation authUser={this.state.authUser} />
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
  };    
};

export default withFirebase(App);

