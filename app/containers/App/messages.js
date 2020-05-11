/*
 * App Messages
 *
 * This contains all the text for the App container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.App';

export default defineMessages({
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Amplify WebApp',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Amplify App',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
  },
  signUp: {
    id: `${scope}.signUp`,
    defaultMessage: 'Sign Up',
  },
  signUpMessage: {
    id: `${scope}.signUpMessage`,
    defaultMessage: 'Need an Account?',
  },
  signIn: {
    id: `${scope}.signIn`,
    defaultMessage: 'Sign In',
  },
  signInMessage: {
    id: `${scope}.signInMessage`,
    defaultMessage: 'Already have an Account?',
  },
  signOut: {
    id: `${scope}.signOut`,
    defaultMessage: 'Sign Out',
  },
});
