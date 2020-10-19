import React, { useEffect, useState } from 'react';
import { bool, func, object } from 'prop-types';
import {
  Dialog,
  MenuItem,
  Select,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import useStyles from './styles';
import { request } from '../../services/request';
import { getFlights, getStatuses, updateFlight } from '../../services/api';
import formatTime from '../../utiles';
import AlertMessage from '../AlertMessage/AlertMessage';

const FlightDetailModal = ({ visible, handleCancel, flight, onUpdateData }) => {
  const { agree, cancel, selectLabel, btnLoading, selectBox } = useStyles();
  const [status, setStatus] = useState({
    title: flight?.status,
    value: flight?.Type,
  });
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  /**
   * Get all status
   */
  useEffect(() => {
    let reCallAction = false;

    if (!reCallAction) {
      (async () => {
        const response = await request.get(getStatuses()).then(res => res);
        if (response?.ok) {
          setStatusData(response.data);
        }
      })();
    }

    return () => {
      reCallAction = true;
    };
    }, []); // eslint-disable-line

  /**
   * Set status dropdown default value
   */
  useEffect(() => {
    setStatus({
      title: flight?.status,
      value: flight?.statusType,
    });
    }, [flight?.status]); // eslint-disable-line

  /**
   * Handle status dropdown value
   * @param e
   * @param value
   */
  const handleChange = (e, value) => {
    setStatus({
      title: value?.props?.name,
      value: value?.props?.value,
    });
  };

  /**
   * Submit flight status update
   * @returns {Promise<void>}
   */
  const updateFlightStatus = async () => {
    const body = {
      status: status?.title,
      statusType: status?.value,
    };

    setLoading(true);
    const response = await request
      // eslint-disable-next-line no-underscore-dangle
      .patch(updateFlight(flight?._id), body)
      .then(res => res);
    if (response?.ok) {
      setMessage(response?.data?.message);
      handleCancel();
      setShowMessage(true);
      // Call flights list after update status
      const result = await request.get(getFlights()).then(res => res?.data);
      if (result?.length) {
        onUpdateData();
      }
    }
    setMessage(response?.data?.message);
    handleCancel();
    setLoading(false);
  };

  /**
   * Reset modals value after close
   */
  const closeModal = () => {
    setMessage('');
    setShowMessage(false);
    handleCancel();
  };

  /**
   * Flight fields template
   * @param label
   * @param value
   * @returns {*}
   */
  const renderFields = (label, value) => {
    return (
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
        <Typography>{value}</Typography>
      </Grid>
    );
  };

  return (
    <>
      <Dialog
        fullWidth={false}
        maxWidth="xs"
        onClose={handleCancel}
        open={visible}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Flight info</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            {renderFields('Flight Provider', flight?.flightProvider)}
            {renderFields('Flight Code', flight?.flightCode)}
            {renderFields('Source Port Name', flight?.sourcePortName)}
            {renderFields('Source Port Code', flight?.sourcePortCode)}
            {renderFields('Destination Port Name', flight?.destinationPortName)}
            {renderFields('Destination Port Code', flight?.destinationPortCode)}
            {renderFields(
              'Scheduled Arrival',
              formatTime(flight?.scheduledArrival),
            )}
            {renderFields(
              'Scheduled Departure',
              formatTime(flight?.scheduledDeparture),
            )}
            <Grid item xs={6}>
              <FormControl className={selectBox}>
                <InputLabel className={selectLabel}>status</InputLabel>
                <Select
                  value={status?.value}
                  onChange={(e, value) => handleChange(e, value)}
                >
                  {statusData?.map(item => (
                    <MenuItem
                      /* eslint-disable-next-line no-underscore-dangle */
                      key={item._id}
                      value={item.value}
                      name={item.title}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {renderFields(
              'Delay',
              flight?.delayTime ? formatTime(flight?.delayTime) : '- -',
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeModal} className={cancel}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={updateFlightStatus}
            className={agree}
          >
            {loading && <CircularProgress className={btnLoading} />}
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <AlertMessage
        visible={showMessage}
        message={message}
        onClose={setShowMessage}
      />
    </>
  );
};

FlightDetailModal.propTypes = {
  visible: bool,
  handleCancel: func,
  flight: object,
  onUpdateData: func.isRequired,
};

FlightDetailModal.defaultProps = {
  visible: false,
  handleCancel: () => {},
  flight: null,
};

export default FlightDetailModal;
