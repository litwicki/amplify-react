/**
 *
 * SignUpPage
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

/**
 * MaterialUI
 */
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, Button, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formWrapper: {
    flexGrow: 1,
    width: '300px',
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
  signinLink: {
    color: theme.palette.primary.main,
  },
  buttonWrapper: {
    marginTop: theme.spacing(4),
  },
}));

async function signUp({ email, password }) {
  try {
    await Auth.signUp(email, password);
    console.log('sign up success!');
  } catch (err) {
    console.log('error signing up..', err);
  }
}

export default function SignUpPage() {
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
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        })}
        onSubmit={fields => {
          if (fields.password !== fields.confirmPassword) {
            console.log('Password mismatch!');
            return;
          }
          signUp(fields);
        }}
        render={({ errors, touched }) => (
          <Form>
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
            <FormControl
              fullWidth
              variant="filled"
              className={classes.formControl}
            >
              <Field
                component={TextField}
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                type="password"
                className={`${classes.textField}form-control${
                  errors.confirmPassword && touched.confirmPassword
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
                Register
              </Button>
              <Button className={classes.button} type="reset">
                Clear
              </Button>
            </Box>

            <Divider className={classes.divider} />

            <p>
              Already have an account?{' '}
              <Link className={classes.signinLink} to="/auth/signin">
                Sign In
              </Link>
            </p>
          </Form>
        )}
      />
    </Box>
  );
}
