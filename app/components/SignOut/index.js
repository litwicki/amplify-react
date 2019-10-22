/**
 *
 * SignOut
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SignOut() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SignOut.propTypes = {};

export default SignOut;
