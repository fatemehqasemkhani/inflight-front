import { makeStyles } from '@material-ui/styles';
import { green, yellow } from '@material-ui/core/colors';

const darkGreen = green[700];
const lightGreen = green[400];
const yellowColor = yellow[700];

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: '0px 0px 5px #e4e4e4',
    borderRadius: '2px',
    margin: '10px 0',
  },
  info: {
    position: 'relative',
    '&::before': {
      left: '-10px',
      top: 0,
      width: 1,
      height: '100%',
      content: '""',
      position: 'absolute',
      backgroundColor: '#ececec',
    },
  },
  button: {
    color: darkGreen,
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#fff',
    },
    'MuiButton-endIcon': {
      marginLeft: 2,
    },
  },
  arrowIcon: {
    color: lightGreen,
    fontSize: 14,
  },
  deleteIcon: {
    fontSize: '14px !important',
  },
  deleteBtn: {
    color: '#d25757',
    '&:hover': {
      color: '#d25757',
    },
  },
  status: {
    borderRadius: 4,
  },
  greenStatus: {
    backgroundColor: darkGreen,
    color: '#fff',
  },
  yellowStatus: {
    backgroundColor: yellowColor,
    color: '#000',
  },
  boldText: {
    fontWeight: 600,
  },
  flightIcon: {
    color: '#a2a2a2',
    verticalAlign: 'text-top',
    marginRight: '5px',
  },
  delayTime: {
    color: '#9e9e9e',
    textDecoration: 'line-through',
  },
}));

export default useStyles;
