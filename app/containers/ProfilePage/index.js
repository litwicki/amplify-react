/**
 *
 * SignInPage
 *
 */

import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { Link } from 'react-router-dom';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

/**
 * MaterialUI
 */
import { Box, FormControl, Button, Divider, Grid, Avatar } from '@material-ui/core';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import useStyles from './styles';
import makeSelectApp from '../App/selectors';

const ProfilePage = (props) => {

  const classes = useStyles();
  const user = props.userState.user;

  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'profile', saga });

  console.log('container.Profile', props);

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <Box className={classes.formWrapper}>
      <Formik
        initialValues={{
          given_name: user.attributes.given_name,
        }}
        validationSchema={Yup.object().shape({
          given_name: Yup.string()
            .required('Email is required'),
        })}
        onSubmit={fields => {
          console.log('hello world');
        }}
        render={({ errors, touched }) => (
          <Grid container spacing={3}>
            <Grid item xs={2} className={classes.socialLogin}>
            <Avatar
              alt={
                user.signInUserSession.idToken.given_name
              }
              src={
                user.signInUserSession.idToken.payload
                  .picture
              }
              className={classes.avatar}
            />
            </Grid>
            <Grid item xs={3}>
              <Form className={classes.amplifyLogin}>
                <FormControl
                  fullWidth
                  variant="filled"
                  className={classes.formControl}
                >
                  <Field
                    onChange={change}
                    component={TextField}
                    label="Given Name"
                    variant="outlined"
                    name="given_name"
                    type="text"
                    className={`${classes.textField}form-control${
                      errors.given_name && touched.given_name ? ' is-invalid' : ''
                    }`}
                  />
                </FormControl>

                <Box className={classes.buttonWrapper}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button className={classes.button} type="reset">
                    Clear
                  </Button>
                </Box>

              </Form>
            </Grid>
          </Grid>
        )}
      />
    </Box>
  );
}


ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfilePage(),
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

export default compose(withConnect)(ProfilePage);

