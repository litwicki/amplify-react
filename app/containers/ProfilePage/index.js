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
import {
  Box,
  FormControl,
  Button,
  Divider,
  Grid,
  Avatar,
} from '@material-ui/core';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import useStyles from './styles';
import makeSelectApp from '../App/selectors';

const ProfilePage = props => {
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
          email: user.attributes.email,
          given_name: user.attributes.given_name,
          family_name: user.attributes.family_name,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Please enter a valid email address.')
            .required('Email address is required.'),
          given_name: Yup.string().required('Given (first) name is required.'),
          family_name: Yup.string().required('Family (last) name is required.'),
        })}
        onSubmit={fields => {
          console.log('hello world');
        }}
        render={({ errors, touched }) => (
          <Grid container spacing={3}>
            <Grid item xs={2} className={classes.socialLogin}>
              <Avatar
                alt={user.signInUserSession.idToken.given_name}
                src={user.signInUserSession.idToken.payload.picture}
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
                    label="Email address"
                    variant="outlined"
                    name="email"
                    type="text"
                    className={`${classes.textField}form-control${
                      errors.email && touched.email ? ' is-invalid' : ''
                    }`}
                  />
                </FormControl>

                {user.attributes.email_verified && (
                  <Box className={classes.verifyEmail}>
                    Please verify your email address.
                  </Box>
                )}

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
                      errors.given_name && touched.given_name
                        ? ' is-invalid'
                        : ''
                    }`}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  variant="filled"
                  className={classes.formControl}
                >
                  <Field
                    onChange={change}
                    component={TextField}
                    label="Family Name"
                    variant="outlined"
                    name="family_name"
                    type="text"
                    className={`${classes.textField}form-control${
                      errors.family_name && touched.family_name
                        ? ' is-invalid'
                        : ''
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
};

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
