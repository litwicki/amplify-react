/**
 *
 * UserAvatar
 *
 */

import React from 'react';
import Avatar from '@material-ui/core';

const UserAvatar = (props) => {
  return (
    <>
    <Avatar
      alt={props.user.username}
      src={props.user.signInUserSession.idToken.payload.picture}
      {...props}
    />
    </>
  );
}

export default UserAvatar;
