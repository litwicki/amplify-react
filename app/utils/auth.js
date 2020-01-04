/**
 * AWS AMPLIFY
 */
import { Auth } from 'aws-amplify';

export async function updateUserAttributes(user, attributes) {
  console.log('attributes', attributes);

  try {
    const result = await Auth.updateUserAttributes(user, {
      email: attributes.email,
      family_name: attributes.family_name,
      given_name: attributes.given_name,
    });
    console.log(result);
  } catch (e) {
    console.log('ERROR: utils/updateUserAttributes', e);
  }

  const params = {
    bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  };

  Auth.currentAuthenticatedUser(params)
    .then(data => data)
    .catch(err => console.log(err));
}
