/**
 *
 * SignIn
 *
 */

import React from 'react';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import { TextField } from 'formik-material-ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * MaterialUI
 */
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formWrapper: {
   
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
    marginTop: theme.spacing(2),
  },
  googleLogin: {
    marginBottom: theme.spacing(2),
  },
  btnText: {
    marginLeft: theme.spacing(1),
  },
}));

export default function SignIn(props) {
  console.log(props);

  const classes = useStyles();

  async function signIn({ email, password }) {
    try {
      await Auth.signIn(email, password);
      console.log('sign in success!');
    } catch (err) {
      console.log('error signing in..', err);
    }
  }

  return (
    <Box className={classes.formWrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
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
          signIn(fields);
        }}
      >
        {({ errors, touched }) => (
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

            <Grid container size={12} className={classes.buttonWrapper}>
              <Grid item xs={7}>
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
              </Grid>
              <Grid item xs={5}>
                <Button
                  className={classes.googleLogin}
                  onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
                  variant="outlined"
                >
                  <FontAwesomeIcon
                    className={classes.icon}
                    icon={['fab', 'google']}
                  />
                  <div className={classes.btnText}>Login With Google</div>
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
