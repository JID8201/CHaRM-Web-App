import React, { Component } from 'react'
import '../assets/styles/App.css'
import SignIn from './SignIn'
import { Route, Switch, withRouter } from 'react-router-dom'
import NavSideBar from '../components/NavSideBar'
import PrivateRoute from '../components/PrivateRoute'
import { inject, observer } from 'mobx-react'
import ForgotPassword from './ForgotPassword'
import RecyclingData from './RecyclingData'
import GraphData from './GraphData'
import ProfilePage from './ProfilePage'
import { hot } from 'react-hot-loader'
import Export from './Export'
import MapContainer from './MapContainer'
import Register from './Register'

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
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute exact path="/graph" component={GraphData}/>
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <PrivateRoute exact path="/export" component={Export} />
            <PrivateRoute exact path="/map" component={MapContainer} />
            <PrivateRoute path="/" component={RecyclingData} />
          </Switch>
        </NavSideBar>
      </div>
    )
  }
}

export default hot(module)(App)
