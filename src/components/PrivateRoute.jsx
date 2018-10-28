import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('appState')
@observer
export default class PrivateRoute extends React.Component {
  render() {
    const { appState, ...restProps } = this.props;
    if (appState.authenticated) return <Route {...restProps} />;
    return <Redirect to="/login" />;
  }
}