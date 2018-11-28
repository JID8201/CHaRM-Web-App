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
import Register from './Register'
import CircularProgress from '@material-ui/core/CircularProgress'

@inject('commonStore', 'userStore')
@withRouter
@observer
class App extends Component {

  // componentWillMount() {
  //   if (!this.props.commonStore.token) {
  //     this.props.commonStore.setAppLoaded()
  //   }
  // }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore.getUser()
        .finally(() => this.props.commonStore.setAppLoaded())
    } else {
      this.props.commonStore.setAppLoaded()
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
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
              <PrivateRoute path="/" component={RecyclingData} />
            </Switch>
          </NavSideBar>
        </div>
      )
    } else {
      return (
        <NavSideBar>
          <CircularProgress />
        </NavSideBar>
      )
    }
  }
}

export default hot(module)(App)
