import React from 'react';
import { bool, string, func } from 'prop-types';
import { RiMessage3Line } from 'react-icons/Ri';
import { Snackbar } from '@material-ui/core';
import useStyles from './styles';

const AlertMessage = ({ visible, message, onClose }) => {
  const { alertMessage } = useStyles();

  const closeMessage = () => {
    onClose(false);
  };

  return (
    <Snackbar
      className={alertMessage}
      open={visible}
      autoHideDuration={6000}
      onClose={() => closeMessage()}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <p>
        <RiMessage3Line /> {message}
      </p>
    </Snackbar>
  );
};

AlertMessage.propTypes = {
  message: string,
  visible: bool,
  onClose: func,
};

AlertMessage.defaultProps = {
  message: '',
  visible: false,
  onClose: () => {},
};

export default AlertMessage;
