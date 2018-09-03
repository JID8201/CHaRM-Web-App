import React, { Component } from 'react';
import './App.css';
import SignIn from './SignIn';
import Home from './Home';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import NavSideBar from './NavSideBar';


const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NavSideBar>
              <Switch>
                  <Route exact path="/" component={SignIn} />
                  <Route path='/home' component={Home} />
              </Switch>
            </NavSideBar>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
