/**
 *
 * AppWrapper
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  BrowserRouter,
  Link as RouterLink 
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
/**
 * MaterialUI
 */
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Container,
} from '@material-ui/core';

/**
 * Our stuff
 */
import GlobalStyle from '../../global-styles';
import Router from '../../components/Router';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

import { SIGN_IN, SIGN_UP } from './constants';

import { Auth } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  unAuthRoot: {
    paddingTop: theme.spacing(40),
  },
  app: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  userToolbar: {
    textAlign: 'right',
  },
  authFormWrapper: {
    padding: theme.spacing(3),
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Link = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

function AppWrapper(props) {

  function signOut() {
    Auth.signOut()
      .then(data => {
        console.log('App.signOut', data);
      })
      .catch(err => console.log('App.signOut.error', err));
  }
  
  const {userState} = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [authFormType, setAuthFormType] = useState(SIGN_IN);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function toggleForm() {
    if (authFormType === SIGN_IN) {
      setAuthFormType(SIGN_UP);
    } else {
      setAuthFormType(SIGN_IN);
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className={classes.root}>
        {!userState.user && !userState.loading && (
          <Container className={classes.unAuthRoot}>
            <Helmet>
              <title>Amplify | Sign In</title>
              <meta name="description" content="Amplify Web App" />
            </Helmet>
            <Paper className={classes.authFormWrapper}>
              {authFormType === SIGN_IN && (
                <>
                  <SignIn props={props} />
                  <Divider />
                  <p>
                    Need an account?{' '}
                    <Button onClick={toggleForm}>Sign Up</Button>
                  </p>
                </>
              )}
              {authFormType === SIGN_UP && (
                <>
                  <SignUp props={props} />
                  <Divider />
                  <p>
                    Have an account?{' '}
                    <Button onClick={toggleForm}>Sign In</Button>
                  </p>
                </>
              )}
            </Paper>
          </Container>
        )}
        {userState.user && !userState.loading && (
          <>
            <Helmet>
              <title>Amplify</title>
              <meta name="description" content="Amplify Web App" />
            </Helmet>
            <>
              <BrowserRouter>
                <AppBar position="static">
                  <Toolbar>
                    <Typography
                      variant="h6"
                      component={Link}
                      to="/"
                      className={classes.title}
                    >
                      Litwicki
                    </Typography>
                    <div className={classes.userToolbar}>
                      <Avatar
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        alt={
                          userState.user.signInUserSession.idToken.given_name
                        }
                        src={
                          userState.user.signInUserSession.idToken.payload
                            .picture
                        }
                        className={classes.menuAvatar}
                      />
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem component={Link} to="/profile">
                          Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={signOut}>Sign Out</MenuItem>
                      </Menu>
                    </div>
                  </Toolbar>
                </AppBar>
                <Paper className={classes.app}>
                  <Router />
                </Paper>
              </BrowserRouter>
            </>
          </>
        )}
      </div>
    </>
  );
}

AppWrapper.propTypes = {};

export default AppWrapper;