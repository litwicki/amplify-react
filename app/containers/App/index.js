/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';

import GlobalStyle from '../../global-styles';
import Router from '../../components/Router';

export default function App() {
  return (
    <div>
      <Router />
      <GlobalStyle />
    </div>
  );
}
