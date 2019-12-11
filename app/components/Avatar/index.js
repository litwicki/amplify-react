/**
 *
 * Avatar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Avatar() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Avatar.propTypes = {};

export default Avatar;
