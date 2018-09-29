import React, { Component } from 'react';
import './App.css';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavSideBar from './NavSideBar';
import PrivateRoute from './PrivateRoute';
import { inject, observer } from 'mobx-react';
import CreateAccount from '../pages/CreateAccount';
import ForgotPassword from '../pages/ForgotPassword';
import RecyclingData from '../pages/RecyclingData';
import GraphData from '../pages/GraphData';
import ProfilePage from '../pages/ProfilePage';

@inject("store")
@withRouter
@observer
class App extends Component {
  render() {
    console.log(this.props.store.authenticated);
    return (
      <div>
          <NavSideBar>
            <Switch>
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/create-account" component={CreateAccount} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute exact path="/graph" component={GraphData}/>
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute path="/" component={RecyclingData} />
            </Switch>
          </NavSideBar>
      </div>
    );
  }
}

export default App;
