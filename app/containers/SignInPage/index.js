/**
 *
 * SignInPage
 *
 */

import React from 'react';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import { TextField } from 'formik-material-ui';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * MaterialUI
 */
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, Button, Divider, Grid } from '@material-ui/core';

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
  signupLink: {
    color: theme.palette.primary.main,
  },
  buttonWrapper: {
    marginTop: theme.spacing(4),
  },
  socialLogin: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #efefef',
  },
  amplifyLogin: {
    paddingLeft: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

async function signIn({ email, password }) {
  try {
    await Auth.signIn(email, password);
    console.log('sign in success!');
  } catch (err) {
    console.log('error signing in..', err);
  }
}

export default function SignInPage() {
  const classes = useStyles();

  return (
    <Box className={classes.formWrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        })}
        onSubmit={fields => {
          if (fields.password !== fields.confirmPassword) {
            console.log('Password mismatch!');
            return;
          }
          signIn(fields);
        }}
        render={({ errors, touched }) => (
          <Grid container spacing={3}>
            <Grid item xs={2} className={classes.socialLogin}>
              <Button
                onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
                variant="outlined"
              >
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={['fab', 'google']}
                />
                Login With Google
              </Button>
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
                    label="Email (username)"
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
                    Register
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
