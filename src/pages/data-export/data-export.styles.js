import { makeStyles } from '@material-ui/styles';

export default makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 400,
  },
  hidden: {
    display: 'none',
  },
  title: {
    margin: theme.spacing(1, 1, 3, 1),
  },
  buttonContainer: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1, 1, 3, 1),
    minWidth: 120,
    maxWidth: 345,
    display: 'flex',
  },
  formControlButton: {
    margin: theme.spacing(1, 2, 1, 0),
    minWidth: 120,
    maxWidth: 300,
    display: 'flex',
  },
  container: {
    marginBottom: theme.spacing(4),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fieldset: {
    marginBottom: theme.spacing(1),
  },
  checkbox: {
    marginBottom: theme.spacing(1),
  },
  radioGroup: {
    // alignItems: 'center',
  },
}));
