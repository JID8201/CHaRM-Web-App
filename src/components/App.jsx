import React, { Component } from 'react';
import './App.css';
import SignIn from './SignIn';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import NavSideBar from './NavSideBar';
import PrivateRoute from './PrivateRoute';
import { inject, observer } from 'mobx-react';

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
                <PrivateRoute path='/' component={Home} />
            </Switch>
          </NavSideBar>
      </div>
    );
  }
}

export default App;
