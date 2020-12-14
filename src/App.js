import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import React, { Component, Suspense } from 'react';
import Login  from './routes/login/'
import Dashboard from './routes/dashboard/';
import Service from './routes/service';
import GiftCard from './routes/gift-cards';
import ServiceHistory from './routes/service-history';

class App extends Component {
  render() {
    return (
        <Router>
          <Route path="/login" component={() => <Login />} />
          <Route path="/dashboard" component={() => <Dashboard />} />
          <Route path="/service" component={() => <Service />} />
          <Route path="/giftcard" component={() => <GiftCard />} />
          <Route path="/serviceHistory" component={() => <ServiceHistory />} />
        </Router>
    );
  }
}
export default (App);