import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import React, { Component, Suspense } from 'react';
import { createStore, applyMiddleware, $CombinedState } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import './App.css';
import Login from './routes/login/'
import Dashboard from './routes/dashboard/';
import Service from './routes/service';
import GiftCard from './routes/gift-cards';
import ServiceHistory from './routes/service-history';
import Header from './Header';
import Footer from './components/footer/';
import Navbar from './components/navbar/';
import Profile from './routes/profile/';
import Promotions from './routes/promotions/';
import Cookies from 'js-cookie';
import PageNotFound from './routes/404-page/';
import LoadingScreen from "./components/loading-screen";


class App extends Component {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const userLoggedIn = Cookies.get('accessToken')
   
    return (
      <Provider store={store}>
       
        <Router>
       
              { userLoggedIn ?
                <div>
                <Header />
                <div> <Navbar /> </div>
                  <Switch>
                  <Route path="/dashboard" component={() => <Dashboard />} />
                  <Route path="/services" component={() => <Service />} />
                  <Route path="/giftcards" component={() => <GiftCard />} />
                  <Route path="/servicehistory" component={() => <ServiceHistory />} />
                  <Route path="/profile" component={() => <Profile />} />
                  <Route path="/promotions" component={() => <Promotions />} />
                  
                  <Redirect to="/dashboard" /> 
                  </Switch><Footer /> </div> :
                  <Switch>
                    <Route path="/pagenotfound" component={() => <PageNotFound/>} />
                    <Route path="/login" component={() => <Login />} />
                    <Redirect to="/login" />
                  </Switch>
                
              }
         
        </Router>
      </Provider>
    );
  }
}
export default (App);



// class App extends Component {
//   render() {
//     const userLoggedIn = Cookies.get('accessToken')
//     return (
//       <Router>
//         <div>
//           {
//             userLoggedIn ?
//               <div>
//                 <Header />
//                 <div> <Navbar /> </div>
//                 <switch>
//                   <Route path="/dashboard" component={() => <Dashboard />} />
//                   <Route path="/services" component={() => <Service />} />
//                   {/* <Route exact path="/servicesadd" component={() => <ServiceAdd />} /> */}
//                   <Route path="/giftcards" component={() => <GiftCard />} />
//                   {/* <Route path="/giftcardscreate" component={() => <GiftCardCreate />} /> */}
//                   <Route path="/servicehistory" component={() => <ServiceHistory />} />
//                   {/* <Route path="/servicehistoryview" component={() => <ServiceHistoryView />} /> */}
//                   <Route path="/profile" component={() => <Profile />} />
//                   <Route path="/promotions" component={() => <Promotions />} />
//                   {/* <Route path="/promotionsedit" component={() => <PromotionsEdit />} /> */}
//                   <Redirect to="/dashboard" /> 
//                 </switch>
//                 <Footer /> </div>
//               :
//               <Switch>
//               <Route path="/login" component={() => <Login />} />
//               <Redirect to="/login" />
//             </Switch>
//               // <switch>
//               //   <Route path="/login" component={() => <Login />} />
//               // </switch>
//           }
//         </div>
//       </Router>
//     );
//   }
// }
//export default (App);
