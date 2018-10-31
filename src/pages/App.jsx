import React, { Component } from 'react'
import '../assets/styles/App.css'
import SignIn from './SignIn'
import { Route, Switch, withRouter } from 'react-router-dom'
import NavSideBar from '../components/NavSideBar'
import PrivateRoute from '../components/PrivateRoute'
import { inject, observer } from 'mobx-react'
import CreateAccount from './CreateAccount'
import ForgotPassword from './ForgotPassword'
import RecyclingData from './RecyclingData'
import GraphData from './GraphData'
import ProfilePage from './ProfilePage'

@inject('appState')
@withRouter
@observer
class App extends Component {
  render() {
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
    )
  }
}

export default App
