/**
 *
 * RestrictedRoute
 *
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function RestrictedRoute(props) {
  // console.log('RestrictedRoute.props', props);
  const { user, component } = props;
  // console.log('RestrictedRoute.user', user);
  const isAuthenticated = user != null;
  // console.log('isAuthenticated', isAuthenticated);

  if (isAuthenticated) {
    return <Route {...props} component={component} />;
  }
  return <Redirect to="/" from={props.path} />;
}

RestrictedRoute.propTypes = {};

export { RestrictedRoute };
