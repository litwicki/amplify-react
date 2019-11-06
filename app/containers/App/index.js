/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useReducer, useEffect, useState } from 'react';

import {
  withRouter,
  BrowserRouter,
  Link as RouterLink,
  Redirect
} from 'react-router-dom';

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
} from '@material-ui/core';

/**
 * Our stuff
 */
import { Hub, Auth } from 'aws-amplify';
import GlobalStyle from '../../global-styles';
import Router from '../../components/Router';

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
  menuAvatar: {},
}));

function App() {

  if(signOutSuccess) {
    return <Redirect to="/?signout=true" />
  }

  const [userState, dispatch] = useReducer(reducer, initialUserState);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(false);

  const hostname = 'http://localhost:3000/';

  function signOut() {
    Auth.signOut()
      .then(data => {
        console.log('signed out: ', data);
        setSignOutSuccess(true);
      })
      .catch(err => console.log(err));
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // set listener for auth events
    Hub.listen('auth', data => {
      const { payload } = data;
      if (payload.event === 'signIn') {
        setImmediate(() => dispatch({ type: 'setUser', user: payload.data }));
        setImmediate(() =>
          window.history.pushState({}, null, hostname),
        );
      }
      // this listener is needed for form sign ups since the OAuth will redirect & reload
      if (payload.event === 'signOut') {
        setTimeout(() => dispatch({ type: 'setUser', user: null }), 350);
      }
    });
    // we check for the current user unless there is a redirect to ?signedIn=true
    if (!window.location.search.includes('?signedin=true')) {
      checkUser(dispatch);
    }
  }, []);

  return (
    <div className={classes.root}>
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
              {!userState.user && !userState.loading && (
                <Button variant="contained" component={Link} to="/auth/signin">
                  Sign In
                </Button>
              )}
              {userState.user && (
                <div>
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
                    <MenuItem component={Link} to="/profile">Profile</MenuItem>
                    <Divider />
                    <MenuItem onClick={signOut}>Sign Out</MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Paper className={classes.app}>
          <Router user={userState.user} />
          <GlobalStyle />
        </Paper>
      </BrowserRouter>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'setUser':
      return { ...state, user: action.user, loading: false };
    case 'loaded':
      return { ...state, loading: false };
    default:
      return state;
  }
}

async function checkUser(dispatch) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    dispatch({ type: 'setUser', user });
  } catch (err) {
    console.log('checkUser error: ', err);
    dispatch({ type: 'loaded' });
  }
}

export default withRouter(App);
