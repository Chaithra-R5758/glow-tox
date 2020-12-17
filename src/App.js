import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import React, { Component, Suspense } from 'react';
import Login from './routes/login/'
import Dashboard from './routes/dashboard/';
import Service from './routes/service';
import GiftCard from './routes/gift-cards';
import GiftCardCreate from './routes/gift-cards/create';
import ServiceHistory from './routes/service-history';
import ServiceHistoryView from './routes/service-history/view';
import Header from './Header';
import Footer from './components/footer/';
import Navbar from './components/navbar/';
import Cookies from 'js-cookie';
import Profile from './routes/profile/';
import Promotions from './routes/promotions/';
import PromotionsEdit from './routes/promotions/edit';

class App extends Component {
  render() {
    const userLoggedIn = 1 || Cookies.get('accessToken')
    return (
      <Router>
        <div>
          <Header />
          <div>
            <Navbar />
          </div>
          {
            userLoggedIn ?
              <switch>
                <Route path="/dashboard" component={() => <Dashboard />} />
                <Route path="/services" component={() => <Service />} />
                <Route path="/giftcards" component={() => <GiftCard />} />
                <Route path="/giftcardscreate" component={() => <GiftCardCreate />} />
                <Route path="/servicehistory" component={() => <ServiceHistory />} />
                <Route path="/servicehistoryview" component={() => <ServiceHistoryView />} />
                <Route path="/profile" component={() => <Profile />} />
                <Route path="/promotions" component={() => <Promotions />} />
                <Route path="/promotionsedit" component={()=> <PromotionsEdit/>}/>
              </switch> :
              <switch>
                <Route path="/login" component={() => <Login />} />
              </switch>
          }
          <Footer />
        </div>
      </Router>
    );
  }
}
export default (App);