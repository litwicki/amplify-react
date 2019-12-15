/**
 *
 * UserProfileForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

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
  GridItem,
  Avatar
} from '@material-ui/core';

import useStyles from './styles';

function UserProfileForm(props) {

  //props.props?? wtf
  const user = props.props.userState.user;
  const classes = useStyles();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const userEmail = user.attributes.email ? user.attributes.email : null;
  const givenName = user.attributes.given_name ? user.attributes.given_name : null;
  const familyName = user.attributes.family_name ? user.attributes.family_name : null;
  const username = user.username ? user.username : null;

  return (
    <Box className={classes.formWrapper}>
      <Formik
        initialValues={{
          email: userEmail,
          given_name: givenName,
          family_name: familyName,
          username: username
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
            <Grid item xs={4}>
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

                <FormControl
                  fullWidth
                  variant="filled"
                  className={classes.formControl}
                >
                  <Field
                    onChange={change}
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

                {user.attributes.email_verified && (
                  <Box className={classes.verifyEmail}>
                    Please verify your email address.
                  </Box>
                )}

                <Grid container spacing={3}>
                  <Grid item xs={6} spacing={3}>
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
                  </Grid>
                  <Grid item xs={6} spacing={3}>
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
                  </Grid>
                </Grid>

                <Box className={classes.buttonWrapper}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save
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

UserProfileForm.propTypes = {};

export default UserProfileForm;
