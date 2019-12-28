/*
 * LoadingOverlay Messages
 *
 * This contains all the text for the LoadingOverlay component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LoadingOverlay';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LoadingOverlay component!',
  },
});
