/**
 *
 * Router
 *
 */

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import HomePage from '../../containers/HomePage/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import SignInPage from '../../containers/SignInPage';
import SignUpPage from '../../containers/SignUpPage';
import AuthPage from '../../containers/AuthPage';
import ProfilePage from '../../containers/ProfilePage';

class PrivateRoute extends React.Component {
  state = {
    loaded: false,
    isAuthenticated: false,
  };

  componentDidMount() {
    this.authenticate();
    this.unlisten = this.props.history.listen(() => {
      Auth.currentAuthenticatedUser()
        .then(user => console.log('user: ', user))
        .catch(() => {
          if (this.state.isAuthenticated)
            this.setState({ isAuthenticated: false });
        });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  authenticate() {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.setState({ loaded: true, isAuthenticated: true });
      })
      .catch(() => this.props.history.push('/auth'));
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, isAuthenticated } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/auth',
              }}
            />
          )
        }
      />
    );
  }
}

PrivateRoute = withRouter(PrivateRoute);
class AnonRoute extends React.Component {
  state = {
    loaded: false,
    isAuthenticated: false,
  };

  componentDidMount() {
    this.authenticate();
    this.unlisten = this.props.history.listen(() => {
      Auth.currentAuthenticatedUser()
        .then(user => console.log('user: ', user))
        .catch(() => {
          if (this.state.isAuthenticated)
            this.setState({ isAuthenticated: false });
        });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  authenticate() {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.setState({ loaded: true, isAuthenticated: true });
      })
      .catch(() => this.props.history.push('/auth'));
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, isAuthenticated } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  }
}

AnonRoute = withRouter(AnonRoute);

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <AnonRoute exact path="/auth" component={AuthPage} />
    <Route exact path="/auth/signin" component={SignInPage} />
    <AnonRoute exact path="/auth/signup" component={SignUpPage} />
    <PrivateRoute path="/profile" component={ProfilePage} />
    <Route path="" component={NotFoundPage} />
  </Switch>
);

export default Routes;
