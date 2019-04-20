import React, { Component } from 'react';
import './App.css';
import Header from'./components/header/header';
import DiscoverPage from './containers/discover-page/discover-page';
import HomePage from './containers/home-page/home-page';
import RegisterPage from './containers/register-page/register-page';
import LoginPage from './containers/login-page/login-page';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Header} />
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/discover/:page?" component={DiscoverPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;

