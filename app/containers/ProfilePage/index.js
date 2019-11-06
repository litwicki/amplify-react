/**
 *
 * SignInPage
 *
 */

import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import { TextField } from 'formik-material-ui';

/**
 * MaterialUI
 */
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, Button, Divider, Grid, Avatar } from '@material-ui/core';
import { setUseProxies } from 'immer';

const useStyles = makeStyles(theme => ({
  formWrapper: {
    flexGrow: 1,
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  buttonWrapper: {
    marginTop: theme.spacing(4),
  }
}));

const ProfilePage = (user) => {

  const classes = useStyles();

  console.log(user);

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <Box className={classes.formWrapper}>
      <Formik
        initialValues={{
          given_name: '',
          password: '',
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

            </Grid>
            <Grid item xs={3}>
              <Form className={classes.amplifyLogin}>
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
                    value="jimbo bilbo"
                    onChange={change.bind(null, "given_name")}
                    className={`${classes.textField}form-control${
                      errors.given_name && touched.given_name ? ' is-invalid' : ''
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
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    className={`${classes.textField}form-control${
                      errors.password && touched.password ? ' is-invalid' : ''
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
                    Sign In
                  </Button>
                  <Button className={classes.button} type="reset">
                    Clear
                  </Button>
                </Box>

                <Divider className={classes.divider} />

                <p>
                  Need an account?{' '}
                  <Link className={classes.signupLink} to="/auth/signup">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Grid>
          </Grid>
        )}
      />
    </Box>
  );
}

export default ProfilePage;
