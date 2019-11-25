/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useReducer, useEffect, useState } from 'react';

// import PropTypes from 'prop-types';
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
import { Hub, Auth } from 'aws-amplify';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/**
 * MaterialUI
 */

/**
 * Our stuff
 */
import GlobalStyle from '../../global-styles';
import Router from '../../components/Router';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { APP_HOSTNAME } from './constants';

const Link = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const initialUserState = { user: null, loading: true };

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
    maxWidth: 600,
    marginTop: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
  },
}));

function App(props) {
  console.log('container.App', props);

  function signOut() {
    Auth.signOut()
      .then(data => {
        console.log('App.signOut', data);
      })
      .catch(err => console.log('App.signOut.error', err));
  }

  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  const [userState, dispatch] = useReducer(reducer, initialUserState);
  const classes = useStyles();
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

  useEffect(() => {
    // set listener for auth events
    Hub.listen('auth', data => {
      const { payload } = data;

      switch (payload.event) {
        case 'signIn':
          console.log('Hub.listen.auth.signIn', payload);
          setImmediate(() => dispatch({ type: 'setUser', user: payload.data }));
          setImmediate(() => window.history.pushState({}, null, APP_HOSTNAME));
          break;
        case 'signOut':
          console.log('Hub.listen.auth.signOut', payload);
          window.location.href = '/';
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

  return (
    <>
      <GlobalStyle />
      <div className={classes.root}>
        {!userState.user && !userState.loading && (
          <Container>
            <Helmet>
              <title>Amplify | Sign In</title>
              <meta name="description" content="Amplify Web App" />
            </Helmet>
            <Paper className={classes.authFormWrapper}>
              {authFormType === 'signIn' && (
                <>
                  <SignIn props={props} />
                  <Divider />
                  <p>
                    Need an account?{' '}
                    <Button onClick={toggleForm}>Sign Up</Button>
                  </p>
                </>
              )}
              {authFormType === 'signUp' && (
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

// App.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  user: makeSelectApp(),
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
    dispatch({ type: 'setUser', user });
  } catch (err) {
    console.log('checkUser error: ', err);
    dispatch({ type: 'loaded' });
  }
}

export default compose(withConnect)(withRouter(App));
