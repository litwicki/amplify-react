/**
 *
 * AppRouter
 *
 */

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import React from 'react';
import { Switch, Route as PublicRoute } from 'react-router-dom';
import { RestrictedRoute as Route } from '../RestrictedRoute';

import HomePage from '../../containers/HomePage/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import SignInPage from '../../containers/SignInPage';
import SignUpPage from '../../containers/SignUpPage';
import AuthPage from '../../containers/AuthPage';
import ProfilePage from '../../containers/ProfilePage';

function Router() {
  return (
    <Switch>
      <PublicRoute exact path="/" component={HomePage} />
      <PublicRoute exact path="/auth" component={AuthPage} />
      <PublicRoute exact path="/auth/signin" component={SignInPage} />
      <PublicRoute exact path="/auth/signup" component={SignUpPage} />
      <Route exact path='/profile' component={ProfilePage} />
      <PublicRoute path="" component={NotFoundPage} />
    </Switch>
  );
}

export default Router;
