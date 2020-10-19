import { makeStyles } from '@material-ui/styles';
import { green, yellow } from '@material-ui/core/colors';

const primary = green[700]; // #f44336
const yellowColor = yellow[700]; // #f44336

const useStyles = makeStyles(() => ({
  agree: {
    backgroundColor: primary,
    borderColor: primary,
    color: '#fff',
    '&:hover': {
      color: '#fff',
      borderColor: primary,
      backgroundColor: primary,
    },
  },
  cancel: {
    backgroundColor: yellowColor,
    color: '#000',
  },
  selectLabel: {
    fontSize: '16px !important',
    fontWeight: 400,
  },
  btnLoading: {
    width: '14px !important',
    height: '14px !important',
    color: '#fff',
    marginRight: '10px',
  },
  selectBox: {
    width: '100%',
  },
}));

export default useStyles;
