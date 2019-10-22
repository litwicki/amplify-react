/**
 *
 * Router
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AuthPage from 'containers/AuthPage';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Router() {
  return (
    <div>
      {/* <FormattedMessage {...messages.header} /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/auth" component={AuthPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

Router.propTypes = {};

export default Router;
