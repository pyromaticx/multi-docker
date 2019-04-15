import React, { Component } from 'react';
import './App.css';
import Header from'./components/header/header';
import DiscoverPage from './containers/discover-page/discover-page';
import HomePage from './containers/home-page/home-page';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Header} />
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/discover/:page?" component={DiscoverPage} />
        </div>
      </Router>
    );
  }
}

export default App;

