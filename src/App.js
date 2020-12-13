import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import React, { Component, Suspense } from 'react';
import Login  from './routes/login/'
import Dashboard from './routes/dashboard/';
import Service from './routes/service';

class App extends Component {
  render() {
    return (
        <Router>
          <Route path="/login" component={() => <Login />} />
          <Route path="/dashboard" component={() => <Dashboard />} />
          <Route path="/service" component={() => <Service />} />
        </Router>
    );
  }
}
export default (App);