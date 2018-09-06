import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class PrivateRoute extends React.Component {
  render() {
    const { store, ...restProps } = this.props;
    console.log('private route: ', store.authenticated);
    if (store.authenticated) return <Route {...restProps} />;
    return <Redirect to="/login" />;
  }
}