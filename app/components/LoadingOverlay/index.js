/**
 *
 * LoadingOverlay
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    background: 'rgba(0, 0, 0, .5)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressBar: {
    resize: 'both',
    overflow: 'auto',
    padding: theme.spacing(0),
  },
}));

function LoadingOverlay() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={200} className={classes.progressBar} />
    </div>
  );
}

LoadingOverlay.propTypes = {};

export default LoadingOverlay;
