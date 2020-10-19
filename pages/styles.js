import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const darkGreen = green[700];

const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: 30,
  },
  progress: {
    width: '30px !important',
    height: '30px !important',
    position: 'absolute',
    left: '50%',
    top: '50%',
    color: darkGreen,
  },
  divider: {
    color: '#378e3c',
    position: 'relative',
    '&::before': {
      left: 0,
      top: 0,
      width: 100,
      height: 1,
      content: '""',
      position: 'absolute',
      backgroundColor: darkGreen,
    },
  },
}));

export default useStyles;
