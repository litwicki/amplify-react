/**
 *
 * UserProfileForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

/**
 * MaterialUI
 */
import { Box, FormControl, Button, Grid, Avatar } from '@material-ui/core';
import useStyles from './styles';

/**
 * Amplify
 */
import { updateUserAttributes } from '../../utils/auth';
import LoadingOverlay from '../LoadingOverlay';
import { LOAD_USER_ACTION } from '../../containers/App/constants';

import makeSelectApp from '../../containers/App/selectors';

async function handleSubmit(user, fields) {
  updateUserAttributes(user, fields).then(data => data);
}

function UserProfileForm(props) {
  const { userState, dispatch } = props;
  const { attributes } = userState.user;

  const classes = useStyles();

  const userEmail = attributes.email ? attributes.email : null;
  const givenName = attributes.given_name ? attributes.given_name : null;
  const familyName = attributes.family_name ? attributes.family_name : null;
  const username = userState.user.username ? userState.user.username : null;
  const avatar = attributes.picture ? attributes.picture : null;
  const avatarSrc = userState.user.signInUserSession.idToken.payload.picture;

  return (
    <Box className={classes.formWrapper}>
      <Formik
        initialValues={{
          email: userEmail,
          given_name: givenName,
          family_name: familyName,
          username,
          avatar,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Please enter a valid email address.')
            .required('Email address is required.'),
          given_name: Yup.string().required('Given (first) name is required.'),
          family_name: Yup.string().required('Family (last) name is required.'),
          username: Yup.string().required('Username is required.'),
          avatar: Yup.mixed(),
        })}
        onSubmit={(fields, { setSubmitting }) => {
          console.log('fields', fields);
          const { user } = userState;
          handleSubmit(user, fields);
          dispatch({ type: LOAD_USER_ACTION, user });
          setSubmitting(false);
        }}
        render={({ errors, touched, isSubmitting, setFieldValue }) => (
          <>
            {isSubmitting && <LoadingOverlay />}
            <Grid container spacing={3}>
              <Grid item xs={2} className={classes.avatarWrapper}>
                <Button component="label" className={classes.imageButton}>
                  <Avatar
                    alt={userState.user.signInUserSession.idToken.given_name}
                    src={avatarSrc}
                    className={classes.avatar}
                  />
                  <input
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={event => {
                      setFieldValue('avatar', event.currentTarget.files[0]);
                    }}
                    style={{ display: 'none' }}
                  />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Form className={classes.amplifyLogin}>
                  <FormControl
                    fullWidth
                    variant="filled"
                    className={classes.formControl}
                  >
                    <Field
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

                  <FormControl
                    fullWidth
                    variant="filled"
                    className={classes.formControl}
                  >
                    <Field
                      component={TextField}
                      label="Username"
                      variant="outlined"
                      name="username"
                      type="text"
                      className={`${classes.textField}form-control${
                        errors.username && touched.username ? ' is-invalid' : ''
                      }`}
                    />
                  </FormControl>

                  {!attributes.email_verified && (
                    <Box className={classes.verifyEmail}>
                      Please verify your email address. __LINK__
                    </Box>
                  )}

                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        variant="filled"
                        className={classes.formControl}
                      >
                        <Field
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
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        variant="filled"
                        className={classes.formControl}
                      >
                        <Field
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
                    </Grid>
                  </Grid>

                  <Box className={classes.buttonWrapper}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </Box>
                </Form>
              </Grid>
            </Grid>
          </>
        )}
      />
    </Box>
  );
}

UserProfileForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object.isRequired,
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

export default compose(withConnect)(UserProfileForm);
