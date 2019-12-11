import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  unAuthRoot: {
    paddingTop: theme.spacing(40),
  },
  app: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  userToolbar: {
    textAlign: 'right',
  },
  authFormWrapper: {
    padding: theme.spacing(3),
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default useStyles;
