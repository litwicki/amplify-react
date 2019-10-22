/**
 *
 * SignIn
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SignIn() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SignIn.propTypes = {};

export default SignIn;
