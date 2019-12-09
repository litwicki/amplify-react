/*
 * AppWrapper Messages
 *
 * This contains all the text for the AppWrapper component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AppWrapper';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AppWrapper component!',
  },
});
