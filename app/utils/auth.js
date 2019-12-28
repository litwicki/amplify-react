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

    // let result = await Auth.verifyCurrentUserAttributeSubmit('email', 'abc123');

    console.log(result);
  } catch (e) {
    console.log('ERROR: utils/updateUserAttributes', e);
  }
}
