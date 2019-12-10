
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formWrapper: {
      flexGrow: 1,
      marginBottom: theme.spacing(3)
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
    buttonWrapper: {
      marginTop: theme.spacing(4),
    },
    avatar: {
      width: 250,
      height: 250
    }
  }));
  
  export default useStyles;