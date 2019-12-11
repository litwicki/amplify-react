/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  withRouter,
  BrowserRouter,
  Link as RouterLink,
} from 'react-router-dom';

import { Hub, Auth } from 'aws-amplify';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import useStyles from './styles';

/**
 * MaterialUI
 */
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
  Menu,
  MenuItem,
  Divider,
  Container,
  Avatar,
} from '@material-ui/core';

/**
 * Our stuff
 */
import {
  CHECK_USER_ACTION,
  SET_USER_ACTION,
  APP_HOSTNAME,
  SIGN_OUT_USER_ACTION,
} from './constants';
import GlobalStyle from '../../global-styles';
import Router from '../../components/Router';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
// import UserAvatar from '../../components/UserAvatar';

const Link = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

function App(props) {
  useEffect(() => {
    // set listener for auth events
    Hub.listen('auth', data => {
      const { payload } = data;
      switch (payload.event) {
        case 'signIn':
          console.log('Hub.listen.auth.signIn', payload);
          setImmediate(() =>
            dispatch({ type: SET_USER_ACTION, user: payload.data }),
          );
          setImmediate(() => window.history.pushState({}, null, APP_HOSTNAME));
          break;
        case 'signOut':
          console.log('Hub.listen.auth.signOut', payload);
          setImmediate(() =>
            dispatch({ type: SIGN_OUT_USER_ACTION, user: payload.data }),
          );
          setImmediate(() => window.history.pushState({}, null, APP_HOSTNAME));
          break;
        default:
          break;
      }
    });
    // we check for the current user unless there is a redirect to ?signedIn=true
    if (!window.location.search.includes('?signedin=true')) {
      checkUser(dispatch);
    }
  }, []);

  console.log('container.App', props);

  function signOut() {
    Auth.signOut()
      .then(data => {
        console.log('App.signOut', data);
      })
      .catch(err => console.log('App.signOut.error', err));
  }

  useInjectReducer({ key: 'userState', reducer });
  useInjectSaga({ key: 'userState', saga });

  const classes = useStyles();
  const { userState, dispatch } = props;
  console.log('userState', userState);
  const [anchorEl, setAnchorEl] = useState(null);
  const [authFormType, setAuthFormType] = useState('signIn');

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function toggleForm() {
    if (authFormType === 'signIn') {
      setAuthFormType('signUp');
    } else {
      setAuthFormType('signIn');
    }
  }

  return (
    <>
      <Helmet />
      <GlobalStyle />
      <div className={classes.root}>
        {!userState.user && !userState.loading && (
          <Container className={classes.unAuthRoot}>
            <Paper className={classes.authFormWrapper}>
              {authFormType === 'signIn' && (
                <>
                  <SignIn props={props} />
                  <Divider />
                  <p>
                    <FormattedMessage {...messages.signUpMessage} />{' '}
                    <Button onClick={toggleForm}>
                      <FormattedMessage {...messages.signUp} />
                    </Button>
                  </p>
                </>
              )}
              {authFormType === 'signUp' && (
                <>
                  <SignUp props={props} />
                  <Divider />
                  <p>
                    <FormattedMessage {...messages.signInMessage} />{' '}
                    <Button onClick={toggleForm}>
                      <FormattedMessage {...messages.signIn} />
                    </Button>
                  </p>
                </>
              )}
            </Paper>
          </Container>
        )}
        {userState.user && !userState.loading && (
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
                    <FormattedMessage {...messages.appName} />
                  </Typography>
                  <div className={classes.userToolbar}>
                    <Avatar
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      alt={userState.user.signInUserSession.idToken.given_name}
                      src={
                        userState.user.signInUserSession.idToken.payload.picture
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
                        <FormattedMessage {...messages.profile} />
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={signOut}>
                        <FormattedMessage {...messages.signOut} />
                      </MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>
              <Paper className={classes.app}>
                <Router />
              </Paper>
            </BrowserRouter>
          </>
        )}
      </div>
    </>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

async function checkUser(dispatch) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    dispatch({ type: CHECK_USER_ACTION, user });
  } catch (err) {
    console.log('checkUser error: ', err);
  }
}

export default compose(withConnect)(withRouter(App));
