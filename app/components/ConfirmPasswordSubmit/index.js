/**
 *
 * ConfirmPasswordSubmit
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ConfirmPasswordSubmit() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ConfirmPasswordSubmit.propTypes = {};

export default ConfirmPasswordSubmit;
