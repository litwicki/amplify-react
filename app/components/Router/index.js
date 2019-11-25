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
import { Switch, Route } from 'react-router-dom';

import HomePage from '../../containers/HomePage';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import ProfilePage from '../../containers/ProfilePage';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
}

export default Router;
